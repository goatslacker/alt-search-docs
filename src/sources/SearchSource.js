import axios from 'axios'
import SearchActions from '../actions/SearchActions'

export default {
  loadIndex() {
    return {
      remote(state) {
        return axios.get('/search.json').then(req => req.data)
      },

      success: SearchActions.receivedIndex,
      error: SearchActions.noIndexFound
    }
  }
}
