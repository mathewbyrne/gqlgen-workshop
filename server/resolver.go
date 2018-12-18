//go:generate gorunpkg github.com/99designs/gqlgen

package server

import (
	context "context"
)

type Resolver struct{}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Character(ctx context.Context, id *string) (Character, error) {
	return Character{
		ID:      "99",
		Name:    "Batman",
		Species: "Scientist",
		Image:   "http://example.com/foo.jpg",
	}, nil
}
