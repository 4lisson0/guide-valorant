import React, { useState, useEffect } from "react";
import "./agent-styles.css";
import { Card, CardHeader, CardBody, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";

const AppAgent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`https://valorant-api.com/v1/agents/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      setData(jsonData.data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <div className="header">
            <a href="/agents">
              <Icon
                as={ChevronLeftIcon}
                width="3em"
                height="3em"
                color={"#FF4655"}
              />
            </a>
            <div className="h1-header">
              <h1>Agent Details</h1>
            </div>
          </div>
          <Card backgroundColor="transparent" p="4" color="#fffff">
            <CardHeader
              display={"flex"}
              flexDirection={"row-reverse"}
              flexWrap={"wrap"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundImage={data.background}
              backgroundRepeat={"no-repeat"}
              backgroundPosition={"center"}
              backgroundSize={"23em"}
              css={`
              @media (max-width: 480px) {
                background-size: 13em;
                background-position: top;
              `}
            >
              <img src={data.fullPortrait} alt="portrait" />
              <h1>{data.displayName}</h1>
              <div className="descrip-container">
                <p>
                  <span>Descripton:</span> {data.description}
                </p>
              </div>
            </CardHeader>
            <CardBody display={"flex"} flexDirection={"column"} gap={"30px"}>
              <div className="role">
                <p>
                  <span>Type:</span>
                  {data.role.displayName}
                </p>
                <img
                  className="img-role"
                  src={data.role.displayIcon}
                  alt="role"
                />
              </div>
              {data.abilities.map((ability, index) => (
                <div key={index} className="abilities">
                  <p>
                    <span>Abilities:</span>
                  </p>
                  <p>
                    <span>Name:</span> {ability.displayName}
                  </p>
                  <p>
                    <span>Description:</span> {ability.description}
                  </p>
                  <div>
                    <img
                      className="img-ability"
                      src={ability.displayIcon}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AppAgent;
