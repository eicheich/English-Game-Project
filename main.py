import pygame
import random
import time
import sys

# Initialize pygame
pygame.init()

# Set up display with larger dimensions
WIDTH, HEIGHT = 700, 800
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tic Tac Toe")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
GRAY = (128, 128, 128)

# Fonts
FONT = pygame.font.SysFont('comicsans', 80)
SMALL_FONT = pygame.font.SysFont('comicsans', 60)

# Questions (multiple choice)
questions = [
    {"question": "What is the capital of France?",
     "choices": ["A) London", "B) Berlin", "C) Paris", "D) Madrid"],
     "answer": "C"},
    {"question": "What is 5 + 7?",
     "choices": ["A) 10", "B) 11", "C) 12", "D) 13"],
     "answer": "C"},
    {"question": "What color is the sky?",
     "choices": ["A) Blue", "B) Green", "C) Red", "D) Yellow"],
     "answer": "A"},
    {"question": "What is the square root of 64?",
     "choices": ["A) 6", "B) 7", "C) 8", "D) 9"],
     "answer": "C"},
]

# Tic Tac Toe board
board = [' ' for _ in range(9)]

# Players and teams
team1 = ['Player 1', 'Player 2', 'Player 3']
team2 = ['Player 4', 'Player 5', 'Player 6']
teams = [team1, team2]
symbols = ['X', 'O']
turn = 0

# Function to draw the board
def draw_board():
    WIN.fill(GRAY)  # Set a gradient background
    for i in range(1, 3):
        pygame.draw.line(WIN, BLACK, (0, 200 * i), (600, 200 * i), 5)
        pygame.draw.line(WIN, BLACK, (200 * i, 0), (200 * i, 600), 5)

    for i in range(9):
        x = i % 3 * 200 + 100
        y = i // 3 * 200 + 100
        if board[i] != ' ':
            text = FONT.render(board[i], True, BLACK)
            WIN.blit(text, (x - text.get_width() // 2, y - text.get_height() // 2))

    pygame.display.update()

# Function to check for a winner
def check_winner(symbol):
    win_conditions = [(0, 1, 2), (3, 4, 5), (6, 7, 8),
                      (0, 3, 6), (1, 4, 7), (2, 5, 8),
                      (0, 4, 8), (2, 4, 6)]
    return any(all(board[i] == symbol for i in condition) for condition in win_conditions)

# Function to handle the question and answer
def ask_question():
    question = random.choice(questions)
    WIN.fill(WHITE)

    question_text = SMALL_FONT.render(question["question"], True, BLACK)
    WIN.blit(question_text, (WIDTH//2 - question_text.get_width()//2, 630))

    for idx, choice in enumerate(question["choices"]):
        choice_text = SMALL_FONT.render(choice, True, BLACK)
        WIN.blit(choice_text, (20, 730 + idx * 60))

    pygame.display.update()

    start_time = time.time()
    answer = None

    while time.time() - start_time < 5:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_a:
                    answer = 'A'
                elif event.key == pygame.K_b:
                    answer = 'B'
                elif event.key == pygame.K_c:
                    answer = 'C'
                elif event.key == pygame.K_d:
                    answer = 'D'
                if answer:
                    return answer == question["answer"]

    return False

# Main game loop
def tic_tac_toe_game():
    global turn

    while ' ' in board:
        current_team = teams[turn % 2]
        current_player = current_team[turn % 3]
        symbol = symbols[turn % 2]

        print(f"\n{current_player}'s turn ({symbol})")

        if ask_question():
            valid_move = False
            while not valid_move:
                draw_board()  # Show the board after the question is answered correctly
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        pygame.quit()
                        sys.exit()
                    if event.type == pygame.MOUSEBUTTONDOWN:
                        x, y = event.pos
                        row = y // 200
                        col = x // 200
                        index = row * 3 + col
                        if board[index] == ' ':
                            board[index] = symbol
                            valid_move = True

            if check_winner(symbol):
                draw_board()
                print(f"\n{current_player} wins!")
                time.sleep(2)
                return

        turn += 1

    draw_board()
    print("\nIt's a draw!")
    time.sleep(2)

# Run the game
tic_tac_toe_game()
pygame.quit()
