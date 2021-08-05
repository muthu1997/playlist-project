export function PlayListReducer(state = [] , action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: state.length, title: action.payload, video: [] }]
    case 'REMOVE':
      var index = state.findIndex((x) => x.id === action.id);
      var finalresult = [...state];
      finalresult[index].video = [ ...finalresult[index].video.filter(x => x.path != action.path) ];
      return state = finalresult;
    case 'ADD_VIDEO':
      var index_value = state.findIndex((x) => x.id === action.id);
      var result = [...state];
      result[index_value].video = [ ...result[index_value].video, action.video ];
      return state = result;
    default:
      return state;
  } 
}
