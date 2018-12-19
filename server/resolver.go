package server

import (
	"context"
	"fmt"
	"strconv"

	"github.com/mathewbyrne/gqlgen-workshop/server/http"
	"github.com/mathewbyrne/gqlgen-workshop/server/model"
)

type Resolver struct{}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *Resolver) Character() CharacterResolver {
	return &characterResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Character(ctx context.Context, id string) (model.Character, error) {
	chr := model.Character{}
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/%s", id), &chr)
	return chr, err
}

func (r *queryResolver) Characters(ctx context.Context, page int) ([]model.Character, error) {
	var res struct{ Results []model.Character }
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/?page=%d", page), &res)
	return res.Results, err
}

type characterResolver struct{ *Resolver }

func (r *characterResolver) ID(ctx context.Context, chr *model.Character) (string, error) {
	return strconv.Itoa(chr.ID), nil
}
