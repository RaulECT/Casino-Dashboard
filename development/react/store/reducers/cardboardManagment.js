import * as actionsTypes from '../actions/actions'

const initialState = {
  loading: false,
  error: null,
  cardboardsTotal: 0,
  cardboardSelected: null
}

const reducer = ( state = initialState, action ) => {
  const { 
    CREATE_CARDBOARD_START, 
    CREATE_CARDBOARD_SUCCESS, 
    CREATE_CARDBOARD_FAIL,
    SEARCH_CARDBOARD_START,
    SEARCH_CARDBOARD_SUCCESS,
    SEARCH_CARDBOARD_FAIL,
    GET_CARDBOARDS_TOTAL_FAIL,
    GET_CARDBOARDS_TOTAL_START,
    GET_CARDBOARDS_TOTAL_SUCCESS
  } = actionsTypes

  switch ( action.type ) {
    case CREATE_CARDBOARD_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case CREATE_CARDBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case CREATE_CARDBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case SEARCH_CARDBOARD_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case SEARCH_CARDBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cardboardSelected: action.cardboard
      }

    case SEARCH_CARDBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        cardboardSelected: null
      }

    case GET_CARDBOARDS_TOTAL_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_CARDBOARDS_TOTAL_FAIL:
      return {
        ...state,
        loading: false,
        cardboardsTotal: -1,
        error: action.error
      }

    case GET_CARDBOARDS_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        cardboardsTotal: action.cardboardsTotal
      }
  
    default:
      return state
  }
}

export default reducer