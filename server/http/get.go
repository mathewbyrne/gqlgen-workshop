package http

import (
	"encoding/json"
	"net/http"
)

// GetJSON unmarshals the JSON contents of the given URL into a struct
func GetJSON(url string, dst interface{}) error {

	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	decoder := json.NewDecoder(res.Body)
	if err = decoder.Decode(&dst); err != nil {
		return err
	}

	return nil
}
