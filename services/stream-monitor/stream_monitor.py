import requests
import numpy as np
from pydub import AudioSegment
from supabase import create_client, Client
import uuid
import io
from datetime import datetime, timezone
import schedule
import time
import threading
import logging
import json

# Supabase configuration
supabase_url = os.getenv('SUPABASE_URL')
supabase_key = os.getenv('SUPABASE_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

# User agent for requests
headers = {'User-Agent': 'BroadcastHoundMonitor/1.0 (+https://www.broadcasthound.com)'}

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(message)s')
logger = logging.getLogger()

# Suppress logging for requests library
logging.getLogger('urllib3').setLevel(logging.WARNING)
logging.getLogger('requests').setLevel(logging.WARNING)

def json_log(level, message, stream_id=None):
    log_entry = {
        'level': level,
        'message': message,
        'timestamp': datetime.now().isoformat()
    }
    if stream_id:
        log_entry['stream_id'] = stream_id
    logger.log(getattr(logging, level.upper()), json.dumps(log_entry))

def monitor_stream(stream, check_id):
    url = stream['url']
    stream_id = stream['id']
    json_log('info', f"Monitoring stream: {url}", stream_id)
    try:
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        json_log('info', "Stream fetched successfully.", stream_id)
        
        # Read the first 15 seconds of the stream
        audio_data = io.BytesIO()
        start_time = datetime.now()
        for chunk in response.iter_content(chunk_size=1024):
            audio_data.write(chunk)
            if (datetime.now() - start_time).seconds >= 15:
                break
        json_log('info', "Audio data collected for 15 seconds.", stream_id)
        
        audio_data.seek(0)
        audio = AudioSegment.from_file(audio_data, format="mp3")
        json_log('info', "Audio data loaded into AudioSegment.", stream_id)
        
        samples = np.array(audio.get_array_of_samples())
        db = 20 * np.log10(np.sqrt(np.mean(samples**2)))
        json_log('info', f"Calculated dB level: {db} dB", stream_id)
        
        if db < -30:
            json_log('warning', "Stream is silent.", stream_id)
            status = 'down'
        else:
            json_log('info', "Stream is active.", stream_id)
            status = 'online'
    
    except Exception as e:
        json_log('error', f"Error monitoring stream {url}: {e}", stream_id)
        status = 'error'

    update_check_status(stream, check_id, status)

def update_check_status(stream, check_id, status):
    current_time = datetime.now(timezone.utc).isoformat()
    stream_id = stream['id']

    # Update the check data
    check_data = {
        'completed': True,
        'status': status
    }
    json_log('info', f"Updating check data", stream_id)
    supabase.table('checks').update(check_data).eq('id', check_id).execute()
    json_log('info', "Check data updated.", stream_id)
    
    update_data = {
        'last_check': current_time
    }
    
    if status == 'down':
        json_log('warning', f"Updating stream status to 'down': {stream_id}", stream_id)
        update_data.update({
            'status': 'down',
            'last_outage': current_time
        })
    elif status == 'online':
        json_log('info', f"Updating stream status to 'online': {stream_id}", stream_id)
        update_data.update({
            'status': 'online',
            'last_online': current_time
        })
    else:
        json_log('error', f"Updating stream status to 'error': {stream_id}", stream_id)
        update_data.update({
            'status': 'error'
        })
    
    supabase.table('streams').update(update_data).eq('id', stream_id).execute()
    json_log('info', "Stream status updated.", stream_id)

def check_streams():
    json_log('info', "Checking streams...")
    streams_response = supabase.table('streams').select('*').execute()
    
    streams = streams_response.data
    json_log('info', f"Fetched {len(streams)} streams.")
    current_time = datetime.now(timezone.utc).isoformat()

    threads = []

    for stream in streams:
        stream_id = stream['id']
        json_log('info', f"Inserting pending check for stream: {stream_id} - {stream['url']}", stream_id)
        
        # Insert a check with status 'pending'
        check_id = str(uuid.uuid4())
        pending_check_data = {
            'id': check_id,
            'completed': False,
            'stream': stream['id'],
            'created_at': current_time,
            'status': 'pending',
            'account_id': stream['account_id']
        }
        json_log('info', f"Inserting pending check data", stream_id)
        supabase.table('checks').insert(pending_check_data).execute()
        json_log('info', "Pending check data inserted.", stream_id)
        
        # Create a thread for each stream to monitor it concurrently
        thread = threading.Thread(target=monitor_stream, args=(stream, check_id))
        threads.append(thread)
        thread.start()
    
    # Wait for all threads to complete
    for thread in threads:
        thread.join()
    json_log('info', "All streams checked.")

def run_schedule():
    json_log('info', "Scheduling stream checks every 5 minutes.")
    check_streams()
    schedule.every(5).minutes.do(check_streams)
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    run_schedule()
