from datetime import datetime, timedelta
from collections import deque, defaultdict

# Configurable settings
MAX_DAILY_BUCKETS = 7  # for "last 7 days"
daily_buckets = deque(maxlen=MAX_DAILY_BUCKETS)  # rolling window
weekly_total = 0
monthly_total = 0
yearly_total = 0

# Simulate incoming data stream (minute-by-minute)
def simulate_data_stream(start_date, days, kpi_values_per_day):
    current_date = start_date
    all_data = []
    for i in range(days):
        for _ in range(kpi_values_per_day):
            timestamp = datetime(current_date.year, current_date.month, current_date.day)
            all_data.append({"timestamp": timestamp, "kpi1": 1})  # every event adds 1
        current_date += timedelta(days=1)
    return all_data

# Process data into daily bucket and roll up older ones
def process_stream(data):
    global weekly_total, monthly_total, yearly_total
    last_processed_date = None
    current_day_sum = 0

    for event in data:
        event_date = event["timestamp"].date()
        if last_processed_date and event_date != last_processed_date:
            # End of a day, push to daily bucket
            if len(daily_buckets) == MAX_DAILY_BUCKETS:
                expired_value = daily_buckets[0]
                weekly_total -= expired_value
                monthly_total -= expired_value
                yearly_total -= expired_value

            daily_buckets.append(current_day_sum)
            weekly_total += current_day_sum
            monthly_total += current_day_sum
            yearly_total += current_day_sum
            current_day_sum = 0

        current_day_sum += event["kpi1"]
        last_processed_date = event_date

    # Handle the last day
    if current_day_sum > 0:
        if len(daily_buckets) == MAX_DAILY_BUCKETS:
            expired_value = daily_buckets[0]
            weekly_total -= expired_value
            monthly_total -= expired_value
            yearly_total -= expired_value
        daily_buckets.append(current_day_sum)
        weekly_total += current_day_sum
        monthly_total += current_day_sum
        yearly_total += current_day_sum

# Simulate and process
start_date = datetime(2025, 5, 15)
data_stream = simulate_data_stream(start_date, days=31, kpi_values_per_day=1440)  # 1440 = 1 per minute
process_stream(data_stream)


# Show current bucket states
kpi_summary = {
    "Last 7 Days Total": sum(daily_buckets),
    "Last Full Week Total": weekly_total,
    "Last Full Month Total": monthly_total,
    "Last Full Year Total": yearly_total,
    "Daily Breakdown": list(daily_buckets),
}

print(kpi_summary)
