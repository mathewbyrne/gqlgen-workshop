package server

import (
	context "context"
	"fmt"
	"strconv"

	"github.com/mathewbyrne/gqlgen-workshop/server/http"
	"github.com/mathewbyrne/gqlgen-workshop/server/model"
)

type Resolver struct{}

func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}

func (r *Resolver) Character() CharacterResolver {
	return &characterResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Character(ctx context.Context, id int) (model.Character, error) {
	chr := model.Character{}
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/%d", id), &chr)
	return chr, err
}

func (r *queryResolver) Characters(ctx context.Context, page int) ([]model.Character, error) {
	var res struct {
		Results []model.Character
	}
	err := http.GetJSON(fmt.Sprintf("https://rickandmortyapi.com/api/character/?page=%d", page), &res)
	return res.Results, err
}

var likes []int

func LikesCharacters() ([]model.Character, error) {
	if len(likes) == 0 {
		return nil, nil
	}
	ids := ""
	for _, id := range likes {
		ids += fmt.Sprintf("%s,", strconv.Itoa(id))
	}
	url := fmt.Sprintf("https://rickandmortyapi.com/api/character/%s", ids)
	var chrs []model.Character
	err := http.GetJSON(url, &chrs)
	return chrs, err
}

func (r *queryResolver) Likes(ctx context.Context) ([]model.Character, error) {
	return LikesCharacters()
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) Like(ctx context.Context, id int) ([]model.Character, error) {
	likes = append(likes, id)
	return LikesCharacters()
}

type characterResolver struct{ *Resolver }

func (r *characterResolver) IsLiked(ctx context.Context, chr *model.Character) (bool, error) {
	for _, id := range likes {
		if chr.ID == id {
			return true, nil
		}
	}
	return false, nil
}
