# Copyright 2024 Umang Patel
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     https://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import matplotlib.pyplot as plt
import numpy as np

# give python graph for the analysis of the cold start time it show show two lines one for the cold start time and one for the warm start time

# data for the cold start time
lambda_time=[]
with open('NormalStoreQuery.txt', 'r') as f:
    for line in f:
        lambda_time.append(float(line))

# data for the warm start time`
ec2_time=[]
with open('EC2NormalStoreQuery.txt', 'r') as f:
    for line in f:
        ec2_time.append(float(line))

# x axis is just number 1 to 50
x = np.arange(1, 51)

# plot the graph
plt.plot(x, lambda_time, label='Direct Lambda Function Call Time')
plt.plot(x, ec2_time, label='Lambda Function Call via EC2 Time')
plt.xlabel('Number of Requests')
plt.ylabel('Time in Seconds')
plt.title('Lambda Function Time Analysis')
plt.legend()
plt.show()