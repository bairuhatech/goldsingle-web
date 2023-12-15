import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import API from "../../config/API";
import { POST } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/slices/userSlice";

function EmailVerification() {
  const { token, id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const User = useSelector((state: any) => state.User.user);
  const Auth = useSelector((state: any) => state.User);
  const dispatch = useDispatch();
  const verifyEmail = async () => {
    if (token && id) {
      const url = API.USER_VERIFY_EMAIL;
      try {
        const response: any = await POST(url, {
          userId: Number(id),
          token: token,
        });
        if (response.status == true) {
          messageApi.success(response?.message);
          if (Auth.auth && User?.data?._id == id) {
            dispatch(update(response?.data));
          }
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          messageApi.error(response?.message);
        }
      } catch (error) {
        messageApi.error(`Failed to verify your email. try again.`);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div>
      {contextHolder}
      {loading ? <Loading /> : <div>datass</div>}
    </div>
  );
}

export default EmailVerification;
