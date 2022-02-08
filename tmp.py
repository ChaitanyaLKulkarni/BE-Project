
import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 8052        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    op = ""
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(4096)
            if not data:
                break
            op += data.decode("utf-8")
            print("Got ", len(op))
            with open("op.sigml", "w") as f:
                f.write(op)
            # conn.sendall(data)
