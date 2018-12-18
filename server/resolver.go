//go:generate gorunpkg github.com/99designs/gqlgen

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
