import adminAppActions from '../redux/actions/adminAppActions'
import {connect} from 'react-redux'
import {useState,useEffect} from 'react'
import Header from '../components/Header'





const AdminApp = ({userLogged,getAllRequest,approveRequest,rejectRequest}) => {
    const [requests,setRequests] = useState(null);

    /*const fetchAPIGetAllRequest = async () => {
        
    }*/

    useEffect(()=>{
        getAllRequest(userLogged.token)
        .then(res => setRequests(res))
        .catch(err => {console.log(err)})
    },[])

    if(!requests) return <h1>Loading ...</h1>

    const respondRequest = async (request,type) => {
        let functionReference = type === "approve" ? approveRequest : rejectRequest;

        let data = await functionReference(userLogged.token,request._id);
        if(data.success){
            let newRequests = requests.filter(req => req._id !== request._id)
            setRequests(newRequests)
        }

    }

    return(
        <>
        <Header />
        <div className = "body">
            {requests.map(request => {
                {console.log(request)}
                return (
                    <div key = {request._id}  style={{width:"90vw",display:'flex',alignItems:'center',justifyContent:"space-around",marginTop:"12px",backgroundColor:"lightblue" }}> 
                        <img  src = {request.logoStore.url} style={{width:"100px"}}/>
                        <div style={{width:"60%",display:'flex',flexDirection:"column"}}>
                            <div style= {{display:'flex',justifyContent:"space-around"}}>
                                <span>From : {`${request.userOfRequest.firstName} ${request.userOfRequest.lastName}`}</span>
                                <img  src = {request.userOfRequest.userImg.url} style={{width:"40px"}}/>
                            </div>
                            <div style={{display:'flex',justifyContent:"space-around"}}>
                                <span>Category: {request.category.nameCategory}</span>
                                <span>Descripcion:  {request.description}</span>
                            </div>
                        </div>    
                        <div style = {{width:"10%",display:"flex", flexDirection:"column"}}>
                            <button onClick = {()=> respondRequest(request,"approve")}>Approve</button>
                            <button onClick = {()=> respondRequest(request,"reject")}>Reject</button>
                        </div>
                    </div>
                )
            })}
            
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogged : state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    getAllRequest: adminAppActions.getAllRequest,
    approveRequest: adminAppActions.approveRequest,
    rejectRequest: adminAppActions.rejectRequest,
}


export default connect(mapStateToProps,mapDispatchToProps)(AdminApp)