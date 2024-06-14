import { formatDistance } from 'date-fns';

import { Database } from '@kit/supabase/database';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';

type Stream = Database['public']['Tables']['streams']['Row'];

type Props = {
  stream: Stream;
};

export function StreamStatCards({ stream }: Props) {
  return (
    <div
      className={
        'grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-3' +
        ' mt-4 2xl:grid-cols-3'
      }
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Currently {stream.status === 'online' ? 'up' : 'down'} for
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stream.last_outage ? (
              <div>
                {stream.last_online ? (
                  <span>
                    {formatDistance(new Date(stream.last_outage), new Date(), {
                      includeSeconds: true,
                    })}
                  </span>
                ) : (
                  <span>Forever</span>
                )}
              </div>
            ) : (
              <div>
                {formatDistance(new Date(stream.created_at), new Date(), {
                  includeSeconds: true,
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Last checked
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stream.last_check ? (
              <span>
                {formatDistance(new Date(stream.last_check), new Date(), {
                  includeSeconds: true,
                })}
                {' ago'}
              </span>
            ) : (
              <span>Never</span>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            Last outage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stream.last_outage ? (
              <div>
                {formatDistance(new Date(stream.last_outage), new Date(), {
                  includeSeconds: true,
                })}
                {' ago'}
              </div>
            ) : (
              <div>Never</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
