import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { Popover } from "react-tiny-popover";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Spin, Tag } from "antd";
import API from "../../config/API";
import { GET } from "../../utils/apiCalls";
import useDebounce from "../../shared/hook/useDebounce";
import { LoadingOutlined } from "@ant-design/icons";
import { TfiSearch } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import useSize from "../../shared/hook/useSize";
import { useSelector } from "react-redux";
import { BsMicFill } from "react-icons/bs";
const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;
function SearchBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const inputElement: any = useRef();
  const searchInput: any = useRef(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [voiceSearch, setVoiceSearch] = useState<boolean>(false);

  const windowSize = useSize();
  const [popoverWidth, setPopoverWidth] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams?.get("qs") || "");
  const debounce = useDebounce(value, 300);

  const Category = useSelector((state: any) => state.Category.categries);
  const [subCategories, setSubcategories] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    getRecomendations();
  }, [debounce]);

  useEffect(() => {
    setPopoverWidthDynamic();
  }, [windowSize]);

  useEffect(() => {
    setPopoverWidthDynamic();
  }, []);

  const focusInput = () => {
    setTimeout(() => {
      inputElement?.current?.focus();
    }, 10);
  };
  const formSubmitHandler = (values: any) => {
    setOpen(false);
    navigate(`search?qs=${values?.search}`);
  };

  const setPopoverWidthDynamic = () => {
    setTimeout(() => {
      if (
        searchInput?.current?.offsetWidth &&
        searchInput?.current?.offsetWidth > 200
      ) {
        setPopoverWidth(searchInput?.current?.offsetWidth + 27);
      } else {
        setPopoverWidth(windowSize[0]);
      }
    }, 500);
  };

  const getAllSubcategories = async () => {
    const subcategories: string[] = [];
    const category_subcategory: string[] = [];
    Category?.forEach((item: any) => {
      category_subcategory.push(item.name);
      item?.sub_categories?.forEach((item: any) => {
        subcategories.push(item);
        category_subcategory.push(item.name);
      });
    });
    setAllCategories(category_subcategory);
    setSubcategories(subcategories);
  };

  const getRecomendations = async () => {
    setLoading(true);
    const url = API.PRODUCT_SEARCH + `recomm/${value}`;
    try {
      if (value.length) {
        const response: any = await GET(url, null);
        if (response?.status) {
          const recomments: string[] = Array.from(
            new Set([...recommendations, ...response?.data])
          );
          setRecommendations(recomments);
        }
      } else {
        setRecommendations([]);
      }
    } catch (err: any) {
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const filterData = (e: any) => {
    {
      setValue(e?.target?.value);
      const filtered = allCategories.filter(function (str: string) {
        return str.toLowerCase().includes((e?.target?.value).toLowerCase());
      });
      setRecommendations(filtered);
    }
  };

  const handleTagChange = (item: any) => {
    setOpen(false);
    let url = `/products/category?id=${window.btoa(item._id)}&type=${
      item.name
    }`;
    navigate(url);
  };
  useMemo(() => {
    getAllSubcategories();
  }, [Category]);

  const onVoiceSearch = () => {};

  return (
    <>
      <Popover
        ref={searchInput}
        isOpen={open}
        onClickOutside={() => setOpen(false)}
        positions={["bottom"]}
        align={"center"}
        containerStyle={{ zIndex: "1002" }}
        content={
          <div
            className="searchPlaceInputHead-popover"
            style={{ minWidth: `${popoverWidth}px` }}
          >
            <div
              className="SearchBar-mobileDiv"
              style={{ width: popoverWidth - 30 }}
            >
              <div onClick={() => setVoiceSearch(true)}>
                <BsMicFill size={20} color="#DA9100" />
              </div>
              <div onClick={() => setOpen(false)}>
                <AiOutlineClose size={26} />
              </div>
            </div>
            <div>
              <Form
                onFinish={formSubmitHandler}
                initialValues={{ search: value }}
              >
                <Form.Item name={"search"}>
                  <Input
                    ref={inputElement}
                    className="SearchBar-input"
                    onChange={(e: any) => filterData(e)}
                    placeholder="Search gifts and flowers . . .  "
                  ></Input>
                </Form.Item>
              </Form>
            </div>
            {loading ? <Spin indicator={antIcon} /> : null}
            <div
              className="SearchBar-tags"
              style={{ maxWidth: `${popoverWidth}px` }}
            >
              {value.length == 0 && loading == false
                ? subCategories.map((tag: any, i: number) => (
                    <Tag
                      onClick={() => handleTagChange(tag)}
                      style={{ cursor: "pointer" }}
                    >
                      {tag.name}
                    </Tag>
                  ))
                : null}
            </div>
            {recommendations.map((item: string, index: number) => {
              return (
                <div
                  key={index}
                  className="SearchBar-item"
                  onClick={() => {
                    setValue(item);
                    navigate(`search?qs=${item}`);
                    setOpen(false);
                  }}
                >
                  <div>
                    <TfiSearch size={15} color="grey" />
                  </div>
                  <div className="SearchBar-txt1">{item}</div>
                </div>
              );
            })}
          </div>
        }
      >
        <div className="Header-searchBox">
          <div className="Header-desk-Search" ref={searchInput}>
            <Input
              bordered={false}
              size="small"
              onChange={() => setOpen(true)}
              placeholder="Search gifts and flowers . . .  "
              value={value}
              onClick={(e) => {
                setOpen(true);
                focusInput();
              }}
            />
            <div onClick={() => setVoiceSearch(true)}>
              <BsMicFill size={20} color="#DA9100" />
            </div>
          </div>
          <div className="Header-mobile-Search" onClick={() => setOpen(true)}>
            <TfiSearch size={24} />
          </div>
        </div>
      </Popover>
    </>
  );
}

export default SearchBar;
