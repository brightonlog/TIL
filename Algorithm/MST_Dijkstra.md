# 🗂 알고리즘 - 최소 비용 신장 트리 (MST)

## 📅 2025.09.16 화요일

---

## 🌳 최소 비용 신장 트리 (MST) 란?

**신장 트리(Spanning Tree)**는 N개의 정점을 가진 그래프에서, N개의 모든 정점을 포함하면서 N-1개의 간선으로 사이클 없이 연결된 트리를 말한다. **최소 비용 신장 트리(MST, Minimum Spanning Tree)**는 이러한 신장 트리 중에서 간선들의 **가중치 합이 가장 작은** 트리를 의미한다.

-   **핵심 목표**: 모든 정점을 연결하되, 그 비용을 최소화하는 것.
-   **주요 알고리즘**:
    1.  **프림 (Prim) 알고리즘**: **정점**을 기준으로, 가장 가까운 다음 정점을 탐욕적으로 선택한다.
    2.  **크루스칼 (Kruskal) 알고리즘**: **간선**을 기준으로, 가장 가중치가 낮은 간선부터 사이클이 생기지 않게 선택한다.

-   **알고리즘 선택 기준**:
    -   일반적으로 두 알고리즘의 성능 차이는 크지 않다.
    -   그래프에 간선이 매우 많은 **밀집 그래프**의 경우, **프림 알고리즘**이 조금 더 유리할 수 있다.

---

## 🌲 프림 (Prim) 알고리즘

하나의 정점에서 시작하여, 현재까지 연결된 정점들에서 갈 수 있는 가장 가중치가 낮은 간선을 선택해 트리를 확장해나가는 방식이다.

-   **핵심 아이디어**: BFS 로직에 **우선순위 큐(Heap Queue)**를 적용하여, 현재 탐색 가능한 경로 중 가장 가중치가 낮은 경로를 먼저 방문하도록 만든다.

-   **동작 방식**:
    1.  임의의 정점을 하나 선택하여 시작한다.
    2.  선택된 정점과 인접한 간선들을 모두 우선순위 큐에 넣는다.
    3.  우선순위 큐에서 가중치가 가장 낮은 간선을 꺼낸다.
    4.  해당 간선과 연결된 정점이 아직 방문하지 않은 정점이라면, 트리에 포함시키고 해당 정점과 인접한 간선들을 다시 큐에 넣는다.
    5.  N-1개의 간선이 선택될 때까지 반복한다.

```python
from heapq import heappush, heappop

def prim(start_node):
    # (가중치, 노드) 형태로 저장하여 가중치가 낮은 순으로 정렬
    priority_queue = [(0, start_node)]
    visited = [0] * (V + 1) # MST에 포함되었는지 여부 확인
    min_weight = 0

    while priority_queue:
        weight, node = heappop(priority_queue) # 가중치가 가장 낮은 간선 정보 pop

        # 이미 MST에 포함된 노드라면 건너뛰기
        if visited[node]:
            continue

        visited[node] = 1 # MST에 포함 처리
        min_weight += weight

        # 현재 노드와 연결된 모든 간선 탐색
        for next_weight, next_node in graph[node]:
            if not visited[next_node]:
                heappush(priority_queue, (next_weight, next_node))

    return min_weight

V, E = map(int, input().split())
graph = [[] for _ in range(V + 1)] # 인접 리스트

for _ in range(E):
    start, end, weight = map(int, input().split())
    # 무방향 그래프이므로 양쪽 모두에 정보 추가
    graph[start].append((weight, end))
    graph[end].append((weight, start))

result = prim(0)
print(f'최소 비용 = {result}')
```


## 🍃 크루스칼 (Kruskal) 알고리즘

모든 간선을 가중치 순으로 정렬한 뒤, 가장 가중치가 낮은 간선부터 차례대로 선택하되 **사이클을 형성하지 않는** 간선만 트리에 추가하는 방식이다.

-   **핵심 아이디어**: **Union-Find(서로소 집합)** 자료구조를 사용하여, 두 정점을 연결할 때 사이클이 발생하는지 여부를 효율적으로 확인한다. 

-   **동작 방식**:
    1.  모든 간선을 가중치 기준으로 오름차순 정렬한다.
    2.  가장 가중치가 낮은 간선부터 순서대로 확인한다.
    3.  현재 간선이 연결하는 두 정점이 **서로 다른 집합에 속해 있다면 (사이클이 생기지 않는다면)**, 해당 간선을 선택하고 두 집합을 합친다.
    4.  N-1개의 간선이 선택될 때까지 반복한다.

```python
# Union-Find를 위한 find_set과 union 함수
def find_set(x):
    if x != parents[x]:
        parents[x] = find_set(parents[x]) # 경로 압축
    return parents[x]

def union(x, y):
    rep_x = find_set(x)
    rep_y = find_set(y)
    # 두 노드의 대표자가 같으면, 이미 같은 집합이므로 False 반환 (사이클 발생)
    if rep_x == rep_y:
        return False
    
    # 두 집합을 합침
    if rep_x < rep_y:
        parents[rep_y] = rep_x
    else:
        parents[rep_x] = rep_y
    return True

V, E = map(int, input().split())
edges = []
for _ in range(E):
    start, end, weight = map(int, input().split())
    # (가중치, 시작점, 끝점) 형태로 저장해야 정렬이 쉬움
    edges.append((weight, start, end))

# 가중치 기준으로 간선 리스트를 오름차순 정렬
edges.sort()

parents = [i for i in range(V + 1)]
min_weight = 0
selected_edges = 0

for weight, start, end in edges:
    # 두 노드를 합칠 수 있다면 (사이클이 아니라면)
    if union(start, end):
        min_weight += weight
        selected_edges += 1
        # MST가 완성되면 (V-1개의 간선이 선택되면) 종료
        if selected_edges == V - 1:
            break

print(f'최소 비용 = {min_weight}')
```


---
## 🚗 최단 경로와 다익스트라 (Dijkstra) 알고리즘

MST가 '모든 정점을 연결하는 최소 비용'에 초점을 맞춘다면, **최단 경로** 알고리즘은 '**한 시작점에서 다른 특정 정점까지 가는 가장 짧은 길**'을 찾는 데 목적이 있다.

-   **다익스트라 알고리즘**: 시작점에서부터 다른 모든 정점까지의 최단 경로를 구하는 대표적인 알고리즘. **누적 거리가 가장 짧은 노드**를 우선적으로 방문한다.

-   **프림 vs. 다익스트라**:
    -   **프림**: 단순히 다음 간선의 가중치가 가장 작은 것을 선택한다.
    -   **다익스트라**: **(시작점부터 현재까지의 누적 거리 + 다음 간선 가중치)**가 가장 작은 것을 선택한다.

```python
from heapq import heappop, heappush

def dijkstra(start_node):
    pq = [(0, start_node)]       # (누적 거리, 현재 노드)
    dists = [INF] * (V + 1)      # 각 정점까지의 최단거리를 저장할 배열
    dists[start_node] = 0        # 시작 노드의 최단거리는 0

    while pq:
        dist, node = heappop(pq)

        # 이미 더 짧은 경로가 기록되어 있다면 무시
        if dists[node] < dist:
            continue

        for next_weight, next_node in graph[node]:
            # 다음 노드로 가기 위한 새로운 누적 거리 계산
            new_dist = dist + next_weight

            # 새로운 경로가 기존 경로보다 더 짧을 경우에만 갱신
            if new_dist < dists[next_node]:
                dists[next_node] = new_dist
                heappush(pq, (new_dist, next_node))
    return dists

INF = float('inf') # 문제 조건에 맞는 충분히 큰 수로 설정 (e.g., int(21e8))
V, E = map(int, input().split())
graph = [[] for _ in range(V + 1)] # 인접 리스트

for _ in range(E):
    start, end, weight = map(int, input().split())
    graph[start].append((weight, end)) # 단방향 그래프

# 0번 노드로부터 모든 다른 노드까지의 최단 거리
result_dists = dijkstra(0)
print(result_dists)
```
---

## ✅ 오늘의 핵심 요약

1.  **MST (최소 비용 신장 트리)**는 **모든 정점**을 **최소 비용**으로 연결하는 트리이며, **프림(정점 기준)**과 **크루스칼(간선 기준)** 알고리즘으로 해결합니다.

2.  **프림**은 **BFS에 우선순위 큐**를 적용한 방식이고, **크루스칼**은 **간선 정렬 후 Union-Find**를 사용해 사이클을 방지하는 방식입니다.

3.  **다익스트라**는 MST와 달리, 한 시작점에서 다른 모든 정점까지의 **최단 경로**를 찾는 알고리즘입니다.

4.  가장 큰 차이점으로, **프림**은 다음 **간선 자체의 가중치**가 가장 작은 것을 선택하고, **다익스트라**는 **시작점부터의 누적 거리**가 가장 짧은 경로를 선택합니다.
