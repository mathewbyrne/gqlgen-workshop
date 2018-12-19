package main

import (
	log "log"
	http "net/http"
	os "os"

	handler "github.com/99designs/gqlgen/handler"
	server "github.com/mathewbyrne/gqlgen-workshop/server"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	http.Handle("/", handler.Playground("GraphQL playground", "/query"))

	gqlHandler := handler.GraphQL(server.NewExecutableSchema(server.Config{Resolvers: &server.Resolver{}}))
	http.Handle("/query", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		gqlHandler.ServeHTTP(w, r)
	}))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
