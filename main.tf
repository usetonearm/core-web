provider "aws" {
  region = "us-west-2"
}

resource "aws_iam_role" "scheduler_task_lambda_role" {
  name = "scheduler_task_lambda_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Effect = "Allow",
      Sid = ""
    }]
  })
}

resource "aws_iam_role" "stream_monitor_lambda_role" {
  name = "stream_monitor_lambda_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Principal = {
        Service = "lambda.amazonaws.com"
      },
      Effect = "Allow",
      Sid = ""
    }]
  })
}

resource "aws_iam_policy" "scheduler_task_lambda_policy" {
  name        = "scheduler_task_lambda_policy"
  description = "IAM policy for Scheduler Task Lambda execution"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "logs:*",
        "sqs:SendMessage"
      ],
      Resource = "*"
    }]
  })
}

resource "aws_iam_policy" "stream_monitor_lambda_policy" {
  name        = "stream_monitor_lambda_policy"
  description = "IAM policy for Stream Monitor Lambda execution"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Action = [
        "logs:*",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueAttributes"
      ],
      Resource = "*"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "attach_scheduler_task_policy" {
  role       = aws_iam_role.scheduler_task_lambda_role.name
  policy_arn = aws_iam_policy.scheduler_task_lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "attach_stream_monitor_policy" {
  role       = aws_iam_role.stream_monitor_lambda_role.name
  policy_arn = aws_iam_policy.stream_monitor_lambda_policy.arn
}

resource "aws_sqs_queue" "task_queue" {
  name = "scheduler_task_queue"
}

resource "aws_lambda_function" "scheduler_task" {
  filename         = "packages/lambdas/scheduler/scheduler.zip"
  function_name    = "SchedulerTaskFunction"
  role             = aws_iam_role.scheduler_task_lambda_role.arn
  handler          = "scheduler_task.lambda_handler"
  runtime          = "python3.9"
  source_code_hash = filebase64sha256("packages/lambdas/scheduler/scheduler.zip")
  environment {
    variables = {
      SQS_QUEUE_URL = aws_sqs_queue.task_queue.id
    }
  }
}

resource "aws_lambda_function" "stream_monitor" {
  filename         = "packages/lambdas/monitor/monitor.zip"
  function_name    = "StreamMonitorFunction"
  role             = aws_iam_role.stream_monitor_lambda_role.arn
  handler          = "stream_monitor.lambda_handler"
  runtime          = "python3.9"
  source_code_hash = filebase64sha256("packages/lambdas/monitor/monitor.zip")
  environment {
    variables = {
      SQS_QUEUE_URL = aws_sqs_queue.task_queue.id
    }
  }
}

resource "aws_cloudwatch_event_rule" "every_hour_rule" {
  name                = "EveryHourRule"
  schedule_expression = "rate(1 hour)"
}

resource "aws_cloudwatch_event_target" "scheduler_task_target" {
  rule      = aws_cloudwatch_event_rule.every_hour_rule.name
  target_id = "SchedulerTaskTarget"
  arn       = aws_lambda_function.scheduler_task.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_invoke_scheduler_task" {
  statement_id  = "AllowCloudWatchToInvokeSchedulerTask"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.scheduler_task.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_hour_rule.arn
}

resource "aws_lambda_event_source_mapping" "sqs_event_source_mapping" {
  event_source_arn = aws_sqs_queue.task_queue.arn
  function_name    = aws_lambda_function.stream_monitor.arn
}
