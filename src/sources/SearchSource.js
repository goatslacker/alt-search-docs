import axios from 'axios'
import SearchActions from '../actions/SearchActions'

export default {
  loadIndex(url) {
    return {
      remote(state, url) {
        return axios.get(url).then(req => req.data)
      },

      success: SearchActions.receivedIndex,
      error: SearchActions.noIndexFound
    }
  }
}
