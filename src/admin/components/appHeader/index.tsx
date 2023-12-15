import { useNavigate } from 'react-router-dom';
import BreadCrumb from './components/Breadcrumb';
import './styles.css';
import { IoIosArrowBack } from "react-icons/io"
import React from 'react';


const PageHeader = (props: any) => {
   const navigate = useNavigate()
   return (
      <div className="PageHeader-container">
         <div className="PageHeader-backIcon">
            <IoIosArrowBack size={30} onClick={() => navigate(-1)} />
         </div>
         <div className='PageHeader-titleName'>
            {props?.name}
         </div>
         <div className='PageHeader-postFix'>
            <BreadCrumb
               first={props.first ?? null}
               firstPath={props.firstPath ?? null}
               second={props.second ?? null}
               secondPath={props.secondPath ?? null}
               third={props.third ?? null}
               thirdPath={props.thirdPath ?? null}
            />
         </div>
      </div>
   )
}

export default PageHeader