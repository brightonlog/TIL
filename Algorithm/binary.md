TIL (Today I Learned)
📅 Today: 2025-09-03

주제: 진법 변환과 비트 연산의 이해

<br>

1. 진법 변환 (Number System Conversion)
컴퓨터 과학의 가장 기본이 되는 개념 중 하나인 진법 변환의 원리를 코드로 직접 구현했다.

📝 주요 함수 코드 모음
Python

# 10진수를 2진수로 변환
def decimal_to_binary(n):
    if n == 0:
        return "0"
    
    binary_number = ""
    # n이 0보다 클 때까지 2로 나누면서 나머지를 앞에 추가
    while n > 0:
        remainder = n % 2
        binary_number = str(remainder) + binary_number
        n = n // 2
    return binary_number

# 10진수를 16진수로 변환
def decimal_to_hexadecimal(n):
    if n == 0:
        return "0"
    
    hex_digits = "0123456789ABCDEF"
    hexadecimal_number = ""
    # n이 0보다 클 때까지 16으로 나누면서 나머지를 앞에 추가
    while n > 0:
        remainder = n % 16
        hexadecimal_number = hex_digits[remainder] + hexadecimal_number
        n = n // 16
    return hexadecimal_number

# 2진수를 10진수로 변환
def binary_to_decimal(binary_str):
    decimal_number = 0
    # reversed()로 문자열을 뒤집어 2^0 자리부터 계산
    for i, digit in enumerate(reversed(binary_str)):
        if digit == '1':
            decimal_number += 2 ** i
    return decimal_number
💡 내장 함수 및 팁
파이썬 내장 함수

bin(n): 10진수를 2진수 문자열로 변환 (0b 접두사 포함)

hex(n): 10진수를 16진수 문자열로 변환 (0x 접두사 포함)

16진수를 2진수로 변환하기

16진수 한 자리는 2진수 네 자리로 표현된다.

예시: 0xF9 → F는 15(1111), 9는 1001 → 11111001

[꿀팁]

데이터를 단순 조회만 할 때는 문자열이 가장 빠르다.

데이터에 변화가 필요할 때 리스트나 딕셔너리를 고려하는 것이 좋다.

<br>

2. 비트(Bit)와 비트 연산 (Bitwise Operation)
🤔 비트(Bit)란?
비트(Bit): 컴퓨터 저장의 최소 단위. 0과 1로 데이터를 표현한다.

바이트(Byte): 8개의 비트(8-bit)를 묶은 단위. 메모리 주소가 부여되는 기본 단위이다.

핵심: 컴퓨터는 CPU 내부적으로 비트 연산을 통해 덧셈, 뺄셈 등을 처리하므로 연산 속도가 매우 빠르다.

⚙️ 비트 연산자 종류
연산자	이름	설명
&	AND	두 비트가 모두 1일 때만 1
|	OR	두 비트 중 하나라도 1이면 1
^	XOR	두 비트가 다르면 1, 같으면 0
<<	Left Shift	비트를 왼쪽으로 지정한 횟수만큼 이동 (2 
n
  곱하기)
>>	Right Shift	비트를 오른쪽으로 지정한 횟수만큼 이동 (2 
n
  나누기)

Sheets로 내보내기
XOR의 특징: A ^ B ^ B = A. 특정 값으로 두 번 XOR 연산을 하면 원래 값으로 돌아오므로 간단한 암호화에 사용될 수 있다.

Python

# Left Shift (곱셈 효과)
print(1 << 1)   # 결과: 2 (1 * 2^1)
print(1 << 4)   # 결과: 16 (1 * 2^4)

# Right Shift (나눗셈 효과)
print(7 >> 1)   # 결과: 3 (7 // 2^1)
✨ 비트 연산 응용
1. 특정 n번째 비트가 1인지 확인하기
i & (1 << n) : 1 << n은 n번째 비트만 1이고 나머지는 0인 값을 만든다. 이 값과 & 연산을 하면 i의 n번째 비트가 1일 때만 결과가 0이 아닌 값이 나온다.

Python

# num의 n번째 비트가 1인지 확인하는 함수
def check_bit(num, n):
  if num & (1 << n):
    return True
  else:
    return False

# 테스트
i = 13  # 이진수로 0b1101
print(f"{i}의 2번째 비트는 1인가? -> {check_bit(i, 2)}") # True
print(f"{i}의 1번째 비트는 1인가? -> {check_bit(i, 1)}") # False
2. 부분집합(Subset) 관련 연산
부분집합의 개수 구하기: 원소의 개수가 n개일 때, 부분집합의 개수는 2 
n
 개이다. 이는 1 << n으로 간단히 구할 수 있다.

Python

arr = [1, 2, 3, 4]
print(f"부분 집합의 수: {1 << len(arr)}") # 결과: 16
모든 부분집합 생성하기: for문을 0부터 (1 << n) - 1까지 돌면서 각 숫자를 비트마스크로 사용하여 부분집합을 생성할 수 있다.

Python

arr = [7, 1, 3, 5]
n = len(arr)

# i는 0(0000)부터 15(1111)까지 변하며 각 부분집합을 의미
for i in range(1 << n):
    subset = []
    # idx는 0부터 3까지 돌며 각 원소의 포함 여부를 체크
    for idx in range(n):
        if i & (1 << idx): # i의 idx번째 비트가 1이면
            subset.append(arr[idx]) # 해당 원소를 부분집합에 추가
    print(f"부분집합 {bin(i)}: {subset}")
<br>

3. [심화] 컴퓨터의 숫자 표현 방식
음수 표현: 2의 보수 (Two's Complement)
컴퓨터는 음수를 표현하기 위해 2의 보수 방법을 사용한다.

[음수 표현법의 발전 과정]

부호 비트: 맨 앞 비트를 부호(0: 양수, 1: 음수)로 사용.

문제점: 5 + (-5)가 0이 되지 않는 연산 오류 발생. +0과 -0이 존재.

1의 보수: 모든 비트를 뒤집어서 음수를 표현.

문제점: 5 + (-5)가 0이 되지 않음. 여전히 +0과 -0이 존재.

2의 보수: 1의 보수를 취한 뒤 1을 더한다.

해결책: 부호와 상관없이 덧셈 연산이 정확히 동작하며, 0이 하나만 존재한다. 현재 표준 방식!

실수 표현: 부동 소수점 (Floating-Point)
컴퓨터는 실수를 표현하기 위해 부동 소수점 방식을 사용한다.

특징: 실수는 정확한 값이 아닌 근사값으로 저장된다. 이로 인해 미세한 오차(floating point error)가 발생할 수 있다.

표준: IEEE 754는 컴퓨터에서 부동소수점을 표기하는 국제 표준이다.
