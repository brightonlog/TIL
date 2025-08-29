# 🗂 알고리즘 - BFS & Tree & 탐색 기법  

## 📅 2025.08.29 금  

---

## 🔎 BFS (너비 우선 탐색)  

### 인접 행렬  
```python
MAP = [[0] * 7 for _ in range(7)]
MAP[0][1] = MAP[0][2] = 1
MAP[1][3] = 1
MAP[2][4] = 1
MAP[4][5] = MAP[4][6] = 1
```

### 인접 리스트  
```python
alist = [[] for _ in range(7)]
alist[0] = [1, 2]
alist[1] = [3]
alist[2] = [4]
alist[4] = [5, 6]
```

- **큐(Queue) 기반 탐색**  
- 가까운 노드부터 차례대로 방문  
- 최단거리 문제에 자주 활용됨  

---

## 🌲 Tree  

### 특징  
- 간선 수 = 노드 수 - 1  
- 사이클 없음, 연결 그래프  

### 이진트리 DFS 순회  

- **전위순회 (Pre-order)**: 현재 → 왼쪽 → 오른쪽  
- **중위순회 (In-order)**: 왼쪽 → 현재 → 오른쪽  
- **후위순회 (Post-order)**: 왼쪽 → 오른쪽 → 현재  

```python
def dfs(now):
    if bt[now] == 0: return
    print(bt[now])          # 현재 노드 방문
    dfs(now*2)              # 왼쪽 자식
    dfs(now*2+1)            # 오른쪽 자식
```

---

## 🌳 BST (Binary Search Tree)  

### 정의  
1. 이진 트리의 특성 유지  
2. 왼쪽 자식 < 부모 < 오른쪽 자식  

### 특징  
- 탐색, 삽입, 삭제 → 평균 O(logN)  
- 정렬된 상태 유지  

---

## ⛰ Heap Tree  

### 조건  
1. **완전 이진트리**  
2. **힙 속성**:  
   - 최소 힙 → 부모 ≤ 자식  
   - 최대 힙 → 부모 ≥ 자식  

### 활용  
- 삽입/삭제 O(logN)  
- 우선순위 큐에 자주 사용됨  

---

## 📏 Sliding Window (슬라이딩 윈도우)  

### 핵심 아이디어  
- 구간 합을 매번 계산하지 않고,  
  앞 요소 제거 + 뒤 요소 추가로 **O(1)**에 갱신  

### 구현  
```python
lst  = [4, 5, 1, 1, 5, 4, -3, -13, 9, 20, 13]
M = 5
sum_v = sum(lst[:M])   # 첫 윈도우 합
max_v, max_idx = float('-inf'), 0

for i in range(len(lst)-M):
    sum_v -= lst[i]        # 맨 앞 제거
    sum_v += lst[i+M]      # 새 원소 추가
    if sum_v > max_v:
        max_v, max_idx = sum_v, i+1
```

➡️ **연속 부분합 문제 최적화 필수 패턴!**  

---

## 🎯 Two Pointers (투 포인터)  

### 아이디어  
- 배열 위에 **두 개의 포인터(left, right)**를 두고  
  조건에 따라 범위를 확장/축소하며 탐색  

### 구현  
```python
n, target = map(int, input().split())
arr = list(map(int, input().split()))
cnt, sum_v = 0, 0
left, right = 0, 0

while True:
    if sum_v >= target or right == n:
        sum_v -= arr[left]; left += 1
    elif sum_v < target:
        sum_v += arr[right]; right += 1
    if sum_v == target: cnt += 1
    if left == n: break
```

---

## ✅ 오늘의 핵심 요약  

1. **BFS** = 큐 기반, 최단거리 문제에서 강력  
2. **Tree 순회** = 전위/중위/후위 필수 암기  
3. **BST** = 정렬된 자료 저장 + 탐색 O(logN)  
4. **Heap** = 우선순위 큐의 기본, logN 연산  
5. **Sliding Window** = 연속 구간 최적화 (O(1) 갱신)  
6. **Two Pointers** = 정렬된 배열 구간 탐색 최적화  
