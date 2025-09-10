# Today I Learned: 분할 정복 (Divide and Conquer)

`2025-09-10`
---

오늘은 알고리즘의 핵심 전략 중 하나인 **분할 정복**에 대해 배웠다. 이름 그대로, 커다란 문제를 해결할 수 있을 만큼 잘게 쪼갠 뒤, 각각을 해결하고 마지막에 합쳐서 원래 문제를 푸는 방식이다. 마치 어려운 수학 문제를 풀 때 작은 단계로 나눠서 하나씩 풀어나가는 것과 비슷하다.

분할 정복은 보통 세 가지 단계로 이루어진다.
1.  **분할 (Divide)**: 문제를 더 이상 쪼갤 수 없을 때까지 작은 문제로 나눈다.
2.  **정복 (Conquer)**: 쪼개진 작은 문제들을 각각 해결한다.
3.  **통합 (Combine)**: 해결된 작은 문제들의 답을 합쳐서 원래 문제의 답을 구한다.

이 기법을 사용하는 대표적인 알고리즘으로는 **병합 정렬, 퀵 정렬, 그리고 이진 탐색**이 있다.

---

## 이진 탐색 (Binary Search)

오늘 배운 것 중 가장 중요하고 흥미로웠던 개념이다.

### 이진 탐색이 뭐지?

이진 탐색은 **반으로 쪼개서 범위를 줄여나가는** 똑똑한 탐색 방법이다. 예를 들어, 1부터 50까지의 숫자 중 하나를 맞추는 게임을 할 때, 무작정 1, 2, 3... 순서로 물어보는 것보다 "25!"라고 외쳐서 범위를 절반으로 줄이는 게 훨씬 빠르다. 이진 탐색이 바로 이 원리다.

다만 아주 아주 중요한 **전제 조건**이 있는데, 바로 데이터가 **반드시 정렬된 상태**여야 한다는 것이다. 정렬이 되어 있지 않으면 중간 값을 기준으로 범위를 쪼개는 의미가 없기 때문이다.

### 어떻게 동작할까?

이진 탐색은 다음 과정을 반복하며 값을 찾는다.
1.  데이터의 **중앙에 있는 값**을 선택한다.
2.  이 중앙 값이 내가 찾으려는 값(target)과 같은지 비교한다.
3.  만약 target이 중앙 값보다 **작으면, 왼쪽 절반**을 탐색 대상으로 삼는다.
4.  만약 target이 중앙 값보다 **크면, 오른쪽 절반**을 탐색 대상으로 삼는다.
5.  값을 찾거나, 더 이상 탐색할 범위가 없어질 때까지 이 과정을 반복한다.

### 코드로 살펴보기

이진 탐색은 보통 `while` 반복문이나 재귀 호출로 구현할 수 있다.

**1. 반복문으로 구현하기**

`left`(시작점)와 `right`(끝점) 포인터를 사용해 탐색 범위를 관리하는 방식이다.

```python
# arr는 반드시 정렬되어 있어야 함!
arr = [2, 4, 7, 9, 11, 19, 23]

def binary_search_while(target):
    left = 0              # 탐색 범위의 시작 인덱스
    right = len(arr) - 1  # 탐색 범위의 끝 인덱스

    while left <= right: # 시작점이 끝점보다 작거나 같을 때까지 반복 (교차되면 탐색 실패)
        mid = (left + right) // 2 # 탐색 범위의 중간 인덱스 계산

        if arr[mid] == target: # 중간 값이 타겟과 같다면
            return mid         # 해당 인덱스를 반환하고 종료
        
        # 타겟이 중간 값보다 작다면, 왼쪽 절반을 다시 탐색
        elif target < arr[mid]:
            right = mid - 1 # 끝점을 중간 바로 왼쪽으로 옮김
        
        # 타겟이 중간 값보다 크다면, 오른쪽 절반을 다시 탐색
        else:
            left = mid + 1  # 시작점을 중간 바로 오른쪽으로 옮김

    return -1 # 반복문이 끝날 때까지 못 찾았다면 -1 반환

print(f'9는 {binary_search_while(9)}번째에 위치')
print(f'20은 {binary_search_while(20)}번째에 위치')
```

2. 재귀로 구현하기

탐색 범위를 함수의 인자로 넘겨주면서 자기 자신을 다시 호출하는 방식이다.

```
Python

# arr는 반드시 정렬되어 있어야 함!
arr = [2, 4, 7, 9, 11, 19, 23]

def binary_search_recur(left, right, target):
    if left > right: # 탐색 범위가 교차되면 탐색 실패
        return -1

    mid = (left + right) // 2
    
    if target == arr[mid]: # 값을 찾았으면 인덱스 반환
        return mid
    
    elif target < arr[mid]: # 타겟이 더 작으면
        # 왼쪽 부분에 대해 재귀 호출
        return binary_search_recur(left, mid - 1, target)
    else: # 타겟이 더 크면
        # 오른쪽 부분에 대해 재귀 호출
        return binary_search_recur(mid + 1, right, target)

print(f'9는 {binary_search_recur(0, len(arr)-1, 9)}번째에 위치')
```

# 기타 분할 정복 알고리즘
## 병합 정렬 (Merge Sort)
일단 데이터를 최소 단위(길이 1)까지 쪼갠 뒤, 정렬하면서 다시 합쳐나가는 방식이다. 퀵 정렬과 달리 합치는(merge) 과정에서 실제 정렬이 이루어진다.


### 코드 구현
``` Python
def merge_sort(arr): # 분할
    # 배열의 길이가 1 이하면 이미 정렬된 상태
    if len(arr) <= 1:
        return arr
    
    # 배열을 반으로 나누기
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])  # 왼쪽 절반을 재귀적으로 정렬
    right = merge_sort(arr[mid:]) # 오른쪽 절반을 재귀적으로 정렬
    
    # 정렬된 두 배열을 병합
    return merge(left, right)

def merge(left, right): # 정복 및 통합
    result = []
    left_one, right_one = 0, 0
    
    # 왼쪽과 오른쪽 배열을 비교하며 작은 값을 result에 추가
    while left_one < len(left) and right_one < len(right):
        if left[left_one] <= right[right_one]:
            result.append(left[left_one])
            left_one += 1
        else:
            result.append(right[right_one])
            right_one += 1
            
    # 남아있는 요소들을 result에 추가
    result.extend(left[left_one:])
    result.extend(right[right_one:])
    
    return result

arr = [64, 35, 25, 12, 22, 11, 90]
sorted_arr = merge_sort(arr)
print(sorted_arr)
```
장점: 어떤 경우에도 **O(N log N)**의 시간 복잡도를 보장한다.

단점: 정렬 과정에서 추가적인 메모리 공간이 필요하다.
---
## 퀵 정렬 (Quick Sort)
**기준점(pivot)**을 하나 정하고, 그 기준보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 나누는 '파티셔닝'을 반복하는 방식이다. 파티셔닝을 한 번 할 때마다 최소한 피벗 하나는 제자리를 찾게 된다.

### 코드 구현
```Python
def quick_sort(arr):
    # 배열의 길이가 1 이하면 이미 정렬된 상태
    if len(arr) <= 1: 
        return arr

    # 피벗을 배열의 중간 요소로 선택
    pivot = arr[len(arr) // 2]
    
    # 피벗을 기준으로 작은 값, 같은 값, 큰 값을 각각 리스트에 담음
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    # left와 right 리스트에 대해 재귀적으로 퀵 정렬을 수행하고 합침
    return quick_sort(left) + middle + quick_sort(right)

arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(arr)
print(*sorted_arr)
```

장점: 평균적으로 매우 빠른 **O(N log N)**의 속도를 보이며, 추가 메모리도 거의 필요 없다.

단점: 이미 정렬된 리스트처럼 최악의 경우 **O(N²)**의 시간 복잡도를 가질 수 있다. 하지만 데이터가 많고 무작위일수록 이런 경우는 거의 발생하지 않는다.


