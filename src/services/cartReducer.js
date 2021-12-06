

function cartReducer(state={}, {type, good, price, count=1}) {
    const types = {
        CART_ADD(){
            let newState = {
                ...state,
                [good._id]: {
                    count: (state[good._id]?.count || 0) + count,
                    good: {
                        _id: good._id,
                        name: good.name
                    },
                    price
                }
            }
            return newState;
        },
        CART_REMOVE(){
            let {[good._id]:a, ...newState} = state
            return newState
        },
        CART_CLEAR(){
            let newState = {};
            return newState
        },
        CART_SET(){
            const newState = {...state, [good._id]:{count, good:{_id:good._id, name:good.name}, price}}
            return newState
        }
    }
    if (type in types){
        return types[type]()
    }
    return state
}


export default cartReducer;

export const actionCartAdd = (_id, name, price, count) => ({type: 'CART_ADD', good: {_id, name}, price, count})
export const actionCartRemove = (_id, name) => ({type: 'CART_REMOVE', good: {_id, name}})
export const actionCartSet = (_id, name, price, count) => ({type: 'CART_SET', good: {_id, name}, price, count})
export const actionCartClear = () => ({type: 'CART_CLEAR'})

