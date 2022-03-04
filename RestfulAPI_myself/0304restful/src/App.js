import "./App.css";
import { useState, useEffect } from "react";
import config from "./Config";

function App() {
  const [data, setData] = useState({});

  // 抓取資料，並且要抓到切換 page時的資料
  const getData = async (page = 1) => {
    const obj = await (await fetch(config.AB_LIST + `?page=${page}`)).json();
    console.log(obj);
    setData(obj);
  };

  useEffect(() => {
    // fetch(config.AB_LIST)
    //   .then((r) => r.json())
    //   .then((obj) => {
    //     console.log(obj);
    //     setData(obj);
    //   });
    getData();
  }, []);

  console.log(data);

  const renderData = (data) => {
    if (data.rows && data.rows.length) {
      return data.rows.map((el) => (
        <tr key={"test" + el.pro_id}>
          {/* 註解放在 key值前，也是錯的，會將註解視為一個obj */}
          <td>{el.pro_id}</td>
          <td>{el.pro_name}</td>
          <td>{el.pro_stock}</td>
          <td>{el.pro_intro}</td>
          <td>{el.pro_condition}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td></td>
        </tr>
        // return '' 會判斷 warning，所以加上tr/td或者加 null
      );
    }
  };

  return (
    <>
      <main>
        <div className="container">
        {/* 簡易版的換頁功能(只換網頁內容) */}
          {data.rows && data.rows.length ? (
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={data.page === 1 ? "page-item disabled" : "page-item"}>
                {/* 加入disabled判斷 */}
                  <a className="page-link" href="#/" onClick={() => {
                          getData(data.page - 1);
                        }}>
                    Previous
                  </a>
                </li>
                {Array(data.totalPages)
                  .fill(1)
                  .map((v, i) => (
                    <li
                      className={
                        data.page === i + 1 ? "page-item active" : "page-item"
                      }
                      key={"testpage" + i}
                    >
                    {/* 加入反白active */}
                      <a
                        className="page-link"
                        href="#/"
                        onClick={() => {
                          getData(i + 1);
                        }}
                      >
                      {/* ※注意 onClick這邊容易變成無限迴圈，請小心寫 */}
                        {i + 1}
                      </a>
                    </li>
                  ))}

                <li className={data.page === data.totalPages ? "page-item disabled" : "page-item"}>
                  <a className="page-link" href="#/" onClick={() => {
                          getData(data.page + 1);
                        }}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          ) : (
            ""
          )}
        </div>

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Stock</th>
                <th scope="col">Intro</th>
                <th scope="col">Condition</th>
              </tr>
            </thead>
            <tbody>{renderData(data)}</tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default App;
