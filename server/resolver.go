//go:generate go run scripts/gqlgen.go

package server

import (
	context "context"
	"fmt"

	"github.com/mathewbyrne/gqlgen-workshop/server/http"
)

type Resolver struct{}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Character(ctx context.Context, id int) (Character, error) {
	chr := Character{}
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/%d", id), &chr)
	return chr, err
}

func (r *queryResolver) Characters(ctx context.Context, page int) ([]Character, error) {
	var res struct {
		Results []Character
	}
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/?page=%d", page), &res)
	return res.Results, err
}
