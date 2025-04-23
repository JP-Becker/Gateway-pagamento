FROM golang:1.24.2-alpine AS builder

WORKDIR /app


COPY go.mod go.sum ./

RUN go mod download


COPY . .


RUN CGO_ENABLED=0 GOOS=linux go build -o gateway ./cmd/app

FROM alpine:3.19

WORKDIR /app

COPY --from=builder /app/gateway .
COPY --from=builder /app/.env .


EXPOSE 8081

CMD ["./gateway"]