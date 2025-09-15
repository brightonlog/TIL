# 🗂 알고리즘 - 그래프의 기본과 탐색

## 📅 2025.09.15 월요일

---

## 🏛️ 그래프 (Graph) 란?

**정점(Vertex)**과 이들을 연결하는 **간선(Edge)**의 집합으로, N:N(다대다) 관계를 표현하는 데 용이한 자료구조이다.

-   **그래프의 유형**:
    -   **무방향(양방향) 그래프 (Undirected Graph)**: 간선에 방향이 없어 양쪽으로 이동 가능하다.
    -   **방향 그래프 (Directed Graph)**: 간선에 방향이 있어 한쪽으로만 이동 가능하다.
    -   **가중치 그래프 (Weighted Graph)**: 간선에 비용이나 가중치가 부여된 그래프이다.
    -   **DAG (Directed Acyclic Graph)**: 사이클이 없는 방향 그래프를 의미한다.

### 인접 행렬 vs. 인접 리스트

그래프를 표현하는 대표적인 두 가지 방식이다.

-   **인접 행렬 (Adjacency Matrix)**
    -   **장점**: 두 정점의 연결 정보를 조회하는 속도가 빠르다 ($O(1)$).
    -   **단점**: 연결되지 않은 정보(0)까지 모두 저장해 메모리 효율이 떨어진다.

-   **인접 리스트 (Adjacency List)**
    -   **장점**: 연결된 간선의 정보만 저장하므로 메모리 효율이 매우 좋다.
    -   **단점**: 특정 두 정점의 연결 정보를 확인하려면 리스트를 탐색해야 해 시간이 더 걸릴 수 있다.

---

## 🧭 그래프 완전 탐색: DFS & BFS

그래프의 모든 정점을 중복 없이, 빠짐없이 방문하는 방법이다.

-   **공통점**: 모든 정점을 방문할 수 있다.
-   **차이점**: **방문 순서**가 다르다.

### 언제 무엇을 쓸까? (⭐ 중요)

-   **DFS (깊이 우선 탐색)를 사용할 때**:
    -   특정 경로를 찾아야 할 때 (예: A에서 B로 가는 경로 출력)
    -   가능한 모든 경우의 수를 탐색해야 할 때
    -   **재귀**를 이용해 구현하는 것이 직관적이다.

-   **BFS (너비 우선 탐색)를 사용할 때**:
    -   **최단 거리**나 **최소 비용**을 구해야 할 때 (가중치가 없을 때)
    -   **큐(Queue)**를 이용해 시작점에서 가까운 순서대로 탐색한다.

### 1. 깊이 우선 탐색 (DFS, Depth First Search)

한 방향으로 갈 수 있을 때까지 계속 가다가, 더 이상 갈 곳이 없으면 가장 가까운 갈림길로 돌아와 다른 방향으로 다시 탐색을 시작하는 방식이다.

```python
# visited 배열은 재귀 호출 전에 미리 선언해야 함!
visited = [0] * (N + 1)

def dfs(node):
    visited[node] = 1
    print(node)

    # 현재 노드와 연결된 다른 노드를 재귀적으로 방문
    for next_node in graph[node]:
        if not visited[next_node]:
            dfs(next_node)
# 함수가 끝나는 이유: 더 이상 방문할 곳이 없는 노드에 도달하면
# for문이 실행되지 않고, 함수는 자연스럽게 종료되어 이전 호출 스택으로 돌아간다.
```
2. 너비 우선 탐색 (BFS, Breadth-First Search)
시작점에서 가까운 정점들을 먼저 방문하고, 멀리 떨어져 있는 정점들을 나중에 방문하는 방식이다.
### 2. 너비 우선 탐색 (BFS, Breadth-First Search)

시작점에서 가까운 정점들을 먼저 방문하고, 멀리 떨어져 있는 정점들을 나중에 방문하는 방식이다.

```python
from collections import deque

def bfs(start_node):
    visited = [0] * (N + 1)
    q = deque([start_node]) # 다음에 방문할 노드들을 저장하는 큐
    visited[start_node] = 1

    while q:
        now = q.popleft() # 큐에서 노드를 하나 꺼냄
        print(now)

        # 해당 노드와 연결된, 아직 방문하지 않은 노드들을 큐에 삽입
        for next_node in graph[now]:
            if not visited[next_node]:
                visited[next_node] = 1
                q.append(next_node)
```



## 🤝 서로소 집합 (Union-Find)

교집합이 없는 집합들을 표현하는 자료구조로, 각 집합을 **대표자(Representative)**를 통해 구분한다. "두 원소가 같은 집합에 속해 있는가?"를 빠르게 판별하기 위해 사용된다.

-   **핵심 연산**:
    1.  `make_set(x)`: 원소 x를 포함하는 새로운 집합을 만든다.
    2.  `find_set(x)`: 원소 x가 속한 집합의 대표자를 찾는다.
    3.  `union(x, y)`: 원소 x와 y가 속한 두 집합을 하나로 합친다.

### 연산 효율 높이기: Rank와 경로 압축

단순히 Union-Find를 구현하면 트리가 한쪽으로 치우쳐져 비효율적일 수 있다. **Rank**와 **경로 압축**을 통해 성능을 최적화한다.

-   **`union by rank`**: 두 집합을 합칠 때, 트리의 높이가 낮은 쪽(rank가 낮은 쪽)을 높은 쪽 아래에 붙여 트리가 깊어지는 것을 방지한다.
-   **경로 압축 (Path Compression)**: `find_set`을 실행할 때, 탐색하는 모든 노드가 직접 대표자를 가리키도록 부모 정보를 갱신하여 다음 탐색 속도를 비약적으로 향상시킨다.

```python
# Rank와 경로 압축이 모두 적용된 Union-Find 코드
def make_set(n):
    parents = [i for i in range(n + 1)]
    ranks = [0] * (n + 1)
    return parents, ranks

def find_set(x):
    # 내가 대표자가 아니라면, 부모를 찾으러 감
    if x != parents[x]:
        # 재귀적으로 대표자를 찾고, 그 결과를 나의 부모로 바로 지정 (경로 압축)
        parents[x] = find_set(parents[x])
    return parents[x]

def union(x, y):
    rep_x = find_set(x)
    rep_y = find_set(y)

    if rep_x == rep_y:
        return # 이미 같은 집합

    # Rank를 기준으로 합치기
    if ranks[rep_x] < ranks[rep_y]:
        parents[rep_x] = rep_y
    elif ranks[rep_x] > ranks[rep_y]:
        parents[rep_y] = rep_x
    else: # 랭크가 같을 때
        parents[rep_y] = rep_x
        ranks[rep_x] += 1
```
✅ 오늘의 핵심 요약
그래프는 N:N 관계를 표현하며, 인접 행렬(조회 빠름)과 인접 리스트(메모리 효율)로 구현한다.

DFS는 경로 탐색/경우의 수에, BFS는 최단 거리 탐색에 강점을 가진다.

Union-Find는 '두 원소가 같은 그룹인가?'를 빠르게 확인하는 알고리즘이다.

Union-Find의 성능을 최적화하기 위해 Rank를 이용해 합치고, 경로 압축으로 탐색 속도를 높이는 것이 필수적이다.
