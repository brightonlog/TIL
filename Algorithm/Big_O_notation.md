## ⏱ 시간 복잡도 정리

### 1. Big-O 표기법
- 알고리즘의 실행 시간이 **입력 크기 n에 따라 증가하는 양상**을 수학적으로 표현
- **최악의 경우** 실행 시간을 기준으로 함
- 불필요한 상수와 낮은 차수는 생략

---

### 2. 주요 시간 복잡도

| 표기법 | 의미 | 예시 |
|--------|------|------|
| **O(1)** | 상수 시간 | 배열 인덱스로 접근 |
| **O(log n)** | 로그 시간 | 이진 탐색 |
| **O(n)** | 선형 시간 | 배열 전체 순회 |
| **O(n log n)** | 선형로그 시간 | 병합 정렬, 퀵 정렬 평균 |
| **O(n²)** | 이차 시간 | 이중 반복문 (버블 정렬) |
| **O(2^n)** | 지수 시간 | 부분집합 생성, 브루트포스 |
| **O(n!)** | 팩토리얼 시간 | 순열 생성 |

---

### 3. 시각적 비교
성장 속도 (작은 n → 큰 n):

\[
O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)
\]

---

### 4. 예시 코드

#### O(1) – 상수 시간
```python
def get_first(arr):
    return arr[0]
O(n) – 선형 시간
```
```python
def linear_sum(arr):
    total = 0
    for x in arr:
        total += x
    return total
O(n²) – 이중 반복문
```
```python

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```
O(log n) – 이진 탐색

```python
def binary_search(arr, target):
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```
5. 핵심 요약
Big-O는 최악의 경우 실행 시간 분석 기준

시간 복잡도는 알고리즘 선택의 핵심 요소

같은 문제도 알고리즘에 따라 성능 차이가 큼 (예: 버블 정렬 O(n²) vs 병합 정렬 O(n log n))
