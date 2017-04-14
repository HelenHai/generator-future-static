import {Model} from 'gfs-react-dm'
//import Immutable from 'immutable'

@Model
export default class TestModel {
    //此字段必须要有
    static __name = 'test'

    static bookTypes=[]
    static books=[]
    static book={}
    static updateIndex=-1

   /* static queryBookTypes(data, action){
        
        if(action.data){
            return data.merge(Immutable.fromJS(action.data) )
        }
    }
    static getBooks(data,action){
        return data.merge(Immutable.fromJS({books:action.data}) )
    }
    static updateBook(data,action){
        
        return data.setIn(['books',action.data.index],data.get('book') ).setIn(['updateIndex'],-1)
    }
    static delBook(data,action){
        
        return data.deleteIn(['books',action.data.index] )
    }*/
}