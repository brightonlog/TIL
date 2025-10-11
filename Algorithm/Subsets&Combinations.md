# 🗂 알고리즘 - 조합적 문제와 그리디

## 📅 2025.09.08 월요일

---

## 🌳 부분 집합 (Powerset)

어떤 집합의 모든 부분집합을 의미하며, 공집합과 자기 자신도 포함한다. 원소 개수가 $n$개일 때, 각 원소를 "포함한다/포함하지 않는다" 두 가지 경우의 수가 있으므로 부분집합의 총개수는 $2^n$개이다.

### 비트 연산과 부분 집합

부분 집합의 원소를 표현할 때 이진수를 이용해 할 수 있다.

- bit[i] == 0
  - arr[i]원소가 부분집합에 포함되지 않았다는 것을 의미
- bit[i] == 1
  - arr[i] 원소가 부분집합에 포함되었다는 의미

```python
bit = [0, 0, 0, 0]
for i in range(2):
    bit[0] = i                    # 0번 원소
    for j in range(2):
        bit[1] = j                # 1번 원소
        for k in range(2):
            bit[2] = k            # 2번 원소
            for l in range(2):
                bit[3] = l        # 3번 원소
                print_subset(bit) # 생성된 부분 집합 출력

```

### 1. 바이너리 카운팅 (비트 연산)

모든 부분집합을 구해야 할 때 가장 효율적이고 추천되는 방법이다. 각 원소의 포함 여부를 이진수의 각 자리(0 또는 1)에 대응시켜 표현한다.

- **방법 1: 비트를 직접 지정하여 검사**

  ```python
  arr = [1, 2, 3, 4]
  n = len(arr)

  # i는 0부터 2^n - 1까지의 숫자로, 각각의 부분집합을 의미
  for i in range(1 << n):
      for idx in range(n):
          # i의 idx번째 비트가 1인지 확인
          if i & (1 << idx):
              print(arr[idx], end=" ")
      print()
  ```

- **방법 2: 검사할 비트를 오른쪽으로 시프트하며 검사**

  ```python
  arr = [1, 2, 3, 4]

  def get_sub(tar):
      for i in range(len(arr)):
          # tar의 가장 오른쪽 비트가 1인지 확인
          if tar & 0x1:
              print(arr[i], end=' ')
          # 다음 비트를 검사하기 위해 오른쪽으로 1칸 시프트
          tar >>= 1

  for target in range(1 << len(arr)):
      get_sub(target)
      print()
  ```

### 2. 재귀 호출 (완전 탐색)

재귀를 이용해 각 원소를 포함하는 경우와 포함하지 않는 경우로 나누어 모든 조합을 탐색한다.

```python
name = ['MIN', 'CO', 'TIM']
n = len(name)

# index: 몇 번째 원소를 결정할 차례인지
# subset: 지금까지 만들어진 부분집합
def recur(index, subset):
    # 종료 조건: 모든 원소를 다 결정했을 때
    if index == n:
        print(subset)
        return

    # 재귀 호출
    # 1. 현재 원소(name[index])를 부분집합에 포함시키는 경우
    recur(index + 1, subset + [name[index]])
    # 2. 현재 원소를 포함시키지 않는 경우
    recur(index + 1, subset)

recur(0, [])
```

---

## 🧩 조합 (Combination)

서로 다른 $n$개의 원소 중 $r$개를 **순서 없이** 고르는 것이다. 부분집합 중 원소의 개수가 특정 $r$개로 정해진 경우와 같다. 핵심 아이디어는 재귀 호출 시, 다음 탐색 범위를 `현재 위치 + 1`로 제한하여 이전에 뽑았던 원소를 다시 뽑지 않도록 하는 것이다.

### 조합 (중복 미허용)

```python
# 5명 중 3명을 순서 없이 고르기
arr = ['A', 'B', 'C', 'D', 'E']
N = 3
path = []

def recur(cnt, start):
    if cnt == N:
        print(*path)
        return

    for i in range(start, len(arr)):
        path.append(arr[i])
        # i번째를 골랐으니, 다음 선택은 i+1 부터 고려 (중복 X)
        recur(cnt + 1, i + 1)
        path.pop()

recur(0, 0)
```

## 중복 조합

```Python

# 5명 중 3명을 순서 없이 중복을 허용하여 고르기
arr = ['A', 'B', 'C', 'D', 'E']
N = 3
path = []

def recur(cnt, start):
    if cnt == N:
        print(*path)
        return

    for i in range(start, len(arr)):
        path.append(arr[i])
        # i번째를 골랐으니, 다음 선택도 i 부터 고려 (중복 O)
        recur(cnt + 1, i)
        path.pop()

recur(0, 0)
```

#🎲 순열 & 중복순열

## 중복 순열

순서 O, 중복 O. 다음 숫자를 뽑을 때 항상 처음부터 다시 탐색한다.

```Python

# 주사위를 3번 던져 나올 수 있는 모든 경우
N = 3
path = []

def recur(cnt):
    if cnt == N:
        print(path)
        return

    # 다음 숫자를 뽑을 때 항상 1부터 다시 시작
    for i in range(1, 7):
        path.append(i)
        recur(cnt + 1)
        path.pop()

recur(0)
```

##순열
순서 O, 중복 X. visited 배열 등을 사용하여 이미 사용한 원소는 건너뛰어야 한다. (오늘은 코드 생략!)

---

💰 탐욕 알고리즘 (Greedy Algorithm)
**"현재 시점에서 가장 좋아 보이는 선택"**을 반복하여 전체 문제의 최적해를 구하려는 알고리즘이다.

그리디 문제 판별 조건
탐욕적 선택 속성 (Greedy Choice Property)

각 단계에서 하는 최적의 선택이, 이후 단계의 선택에 영향을 주지 않아야 한다.

한 번의 선택이 전체 문제의 최적해를 구하는 과정의 일부여야 한다. (규칙이 중간에 바뀌면 안 됨)

최적 부분 구조 (Optimal Substructure)

문제 전체의 최적해가 각 단계에서 이루어진 최적의 선택들(부분 문제의 최적해)로 구성될 수 있어야 한다.

✅ 오늘의 핵심 요약
부분집합은 비트 연산(효율적) 또는 **재귀(학습용)**로 구현할 수 있다.

조합 재귀의 핵심은 for문의 시작점을 start 매개변수로 관리하는 것이다.

조합은 다음 탐색을 i + 1에서, 중복 조합은 i에서 시작하는 차이가 있다.

탐욕(Greedy) 알고리즘은 매 순간 최선의 선택을 하는 방식으로, 이 선택이 미래에 영향을 주지 않고 전체 최적해의 일부가 되어야 한다는 두 가지 속성을 만족해야 한다.
