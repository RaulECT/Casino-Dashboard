import * as actionsTypes from '../actions/actions'
const initialState = {
  loading: false,
  error: null,
  cardboardsTotal: 0,
  cardboardSelected: null,
  cardboardImg: null,
  allCardboards: null
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
    GET_CARDBOARDS_TOTAL_SUCCESS,
    DELETE_CARDBOARD_FAIL,
    DELETE_CARDBOARD_START,
    DELETE_CARDBOARD_SUCCESS
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
        error: null,
        cardboardImg: null,
        cardboardSelected: null
      }

    case SEARCH_CARDBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cardboardSelected: action.cardboard,
        cardboardImg: action.cardboardImg
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
        allCardboards: null,
        error: action.error
      }

    case GET_CARDBOARDS_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        cardboardsTotal: action.cardboardsTotal,
        allCardboards: action.allCardboards
      }

    case DELETE_CARDBOARD_START: 
      return {
        ...state,
        loading: true,
        error: null
      }

    case DELETE_CARDBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cardboardSelected: null
      }

    case DELETE_CARDBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
  
    default:
      return state
  }
}

export default reducer