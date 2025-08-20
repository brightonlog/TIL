# 📅 2025.08.20 수  

🧮 자료구조 & 알고리즘 정리  

---

## 📌 Stack & Queue

### Stack
- **LIFO (Last In First Out)** 구조
- 파이썬: `append()`, `pop()` 활용
- 주 용도: DFS, 수식 계산, Backtracking 등

### Queue
- **FIFO (First In First Out)** 구조
- 파이썬: `collections.deque` 활용
- 주 용도: BFS, 시뮬레이션, 프로세스 관리 등

### Deque (Double-Ended Queue)
- 양쪽에서 삽입/삭제 가능
- 스택+큐 모두 구현 가능
- 파이썬: `deque.append()`, `deque.appendleft()`, `deque.pop()`, `deque.popleft()`

---

## 🌳 DFS / BFS

### DFS (Depth First Search)
- 깊이 우선 탐색  
- **재귀** 기반 구현이 일반적  
- 하나의 경로를 끝까지 탐색 후 되돌아옴  

### BFS (Breadth First Search)
- 너비 우선 탐색  
- **큐(deque)** 기반 구현  
- 가까운 노드부터 차례대로 탐색 (레벨 탐색)  
- 최단거리 문제에 활용  

---

## 🏗️ Priority Queue & Heap
- 우선순위에 따라 데이터 처리
- 파이썬: `heapq` (기본 = 최소 힙)
- 응용: **다익스트라 알고리즘**

---

## 🌲 Tree vs Graph
- **Graph**  
  - 정점(Vertex) + 간선(Edge)  
  - 사이클 존재 가능  
  - 방향/무방향, 가중치 가능  

- **Tree**  
  - 그래프의 특수한 형태  
  - 사이클 없는 연결 그래프  
  - 노드가 N개일 때 간선은 N-1개  
  - 루트(root) 존재  

---

## 📝 Python enumerate
- 반복문에서 **인덱스 + 값** 동시 제공
```python
arr = ['a', 'b', 'c']
for idx, val in enumerate(arr):
    print(idx, val)
# 출력: 0 a / 1 b / 2 c

---

🔑 오늘의 핵심 요약
1. 스택 = LIFO / 큐 = FIFO / 덱 = 양방향 삽입 삭제 가능
2. DFS = 재귀 기반 깊이 탐색 / BFS = 큐 기반 너비 탐색
3. 우선순위 큐 = 힙(heapq)으로 구현 (다익스트라 기반)
4. 트리 = 사이클 없는 그래프, 간선 수 = 노드 수 - 1
5. enumerate = 인덱스와 값을 동시에 꺼낼 때 자주 사용

✅ 오늘 배운 개념들을 TIL에 기록하면서, 각 자료구조와 알고리즘의 활용 맥락을 이해했다.
