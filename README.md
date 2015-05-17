# Alt Search

> A search application built with React and Flux for searching through Alt's API documentation.

### Tech Details

There are a few components to this application: the search index, and the application itself.

The website is indexed with [lunr.js](http://lunrjs.com/). There is a node script [here](https://github.com/goatslacker/alt/blob/master/web/scripts/createIndex.js) that goes through the documentation and creates a lunr-compatible search index which is then serialized into a json file that sits in the `assets` directory of alt's website.

The application then uses [axios](https://github.com/mzabriskie/axios), an HTTP client library, to asynchronously fetch that data and create the lunr database on the client. We're using Alt's async API to load this data:

[SearchSource.js](https://github.com/goatslacker/alt-search-docs/blob/master/src/sources/SearchSource.js)

```js
import axios from 'axios'
import SearchActions from '../actions/SearchActions'

export default {
  loadIndex(context) {
    return {
      remote(state, url) {
        return axios.get(url).then(req => req.data)
      },

      success: SearchActions.receivedIndex,
      error: SearchActions.noIndexFound
    }
  }
}
```

Here `loadIndex` returns an object which is then used to build your async flow. `remote` is what is used to fetch the data, and `success` and `error` are both actions that are fired according to the response.

```js
SearchStore.loadIndex(this.props.url)
```

Once the index has been downloaded and parsed it is sent to `SearchActions.receivedIndex` which is handled by the [SearchStore](https://github.com/goatslacker/alt-search-docs/blob/master/src/stores/SearchStore.js). This store keeps track of the index as well as the documents. The other store, [ResultsStore](https://github.com/goatslacker/alt-search-docs/blob/master/src/stores/ResultsStore.js) is in charge of storing the current search results as well as building the snippets for them.

```js
@bind(SearchActions.search)
search(text = '') {
  this.searchTerm = text
  this.results = text ? this.doSearch(text) : []
}

doSearch(text) {
  const { index, documents } = SearchStore.getState()

  // Search and return the top 10 documents
  return index.search(text).map((result) => {
    const doc = documents[result.ref]
    doc.snippet = this.getSnippet(doc.tokens)
    doc.selected = false
    return doc
  }).slice(0, 10)
}
```

The main entry point to the application is through [SearchView](https://github.com/goatslacker/alt-search-docs/blob/master/src/components/SearchView.js). We are using [AltContainer](http://alt.js.org/docs/components/altContainer/) here to listen to ResultsStore so when data changes our [SearchResults](https://github.com/goatslacker/alt-search-docs/blob/master/src/components/SearchResults.js) view updates with the desired information. The other component is the [SearchBox](https://github.com/goatslacker/alt-search-docs/blob/master/src/components/SearchBox.js) which is an input box that fires actions as you type thus completing the flow:

```txt
SearchBox -> SearchActions.search -> ResultsStore -> SearchResults
```

The SearchBox also listens to keyboard inputs so you can use your up and down arrows to cycle through the search results and make a selection. The selection is stored in the ResultsStore. This keeps all the business logic away in the stores, makes the actions very simple and easy to digest, and keeps the components "dumb" since they're only accepting props and dealing with the presentation of data.

### Other

As you can see [here](https://github.com/goatslacker/alt-search-docs/blob/master/src/stores/ResultsStore.js#L18) we're using [decorators](https://github.com/wycats/javascript-decorators) to bind actions to the store. This is just a nice clean sugar and is available as a stage 0 transform using [babel](http://babeljs.io/).

The [snippets](https://github.com/goatslacker/alt-search-docs/blob/master/src/stores/ResultsStore.js#L60) are the piece of body text that shows under the title of the results. They are calculated by first parsing the markdown of the entire page in question, extracting all the paragraphs out, then finding whether the string you typed is present in any of those paragraphs, the list is then sorted so the paragraph with the highest score is returned. I then take this paragraph and clip it so it doesn't overflow in the UI and present it. We're using [marked](https://github.com/goatslacker/alt-search-docs/blob/master/src/utils/marked.js) for markdown parsing, and [stringScore](https://github.com/goatslacker/alt-search-docs/blob/master/src/utils/stringScore.js) for scoring the strings.

```js
getSnippet(tokens) {
  const text = this.searchTerm
  const items = tokens.map((token) => {
    return {
      score: stringScore(token.text, text),
      text: token.text
    }
  }).filter((obj) => {
    return obj.score > 0
  }).sort((a, b) => {
    return a.score < b.score ? 1 : -1
  })

  return items.length ? items[0].text.slice(0, MAX_CHAR_SUMMARY) : ''
}
```

The most complicated piece of logic is actually the [keyboard selection](https://github.com/goatslacker/alt-search-docs/blob/master/src/stores/ResultsStore.js#L25). It is being parsed and sent by the [SearchBox](https://github.com/goatslacker/alt-search-docs/blob/master/src/components/SearchBox.js#L15) and then handled in the ResultsStore.

## License

[MIT](http://josh.mit-license.org)
