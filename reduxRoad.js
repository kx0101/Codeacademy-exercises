const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0
}

const reducer = (state = initialWagonState, action) => {
  switch(action.type){
    case 'gather': {
      return {
        ...state,
        supplies: state.supplies + 15,
        days: state.days + 1
      }
    }

    case 'travel': {
      return {
        ...state,
        supplies: state.supplies - (action.payload*20),
        distance: state.distance + (action.payload*10),
        days: state.days + action.payload
      }
    }

    case 'tippedWagon': {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1
      }
    }

    default: {
      return state
    }
  }
}

let wagon = reducer(undefined, {});
wagon = reducer(wagon, {
  type: 'travel',
  payload: 1
})
wagon = reducer(wagon, {
  type: 'gather'
})
wagon = reducer(wagon, {
  type: "tippedWagon"
})
wagon = reducer(wagon, {
  type: "travel",
  payload: 3
})
console.log(wagon);
