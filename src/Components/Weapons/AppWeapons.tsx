import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Image,
  Box,
  Icon,
  Button,
  CircularProgress
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import "./weapons-styles.css"
import { DataWeapons } from "../../../types";

const AppWeapons = () => {
  const [data, setData] = useState<DataWeapons[]>([]);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://valorant-api.com/v1/weapons");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="body-weapons">
      <div className="header">
        <a href="/">
          <Icon
            as={ChevronLeftIcon}
            width="3em"
            height="3em"
            color={"#FF4655"}
          />
        </a>
        <div className="h1-header">
          <h1>Weapons</h1>
        </div>
      </div>
      {error && <div>Error: {error}</div>}
      {data.length === 0 ? (
        <Box
          height="50vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="3rem"
        >
          <CircularProgress isIndeterminate color="#FF4655" />
        </Box>
      ) : (
        <SimpleGrid columns={[1, 3]} spacing={10}>
          {data.map((item, index) => (
            <Card
              key={index}
              backgroundColor="transparent"
              borderColor="#FF4655"
              borderWidth="1px"
              borderStyle="solid"
              p="4"
              color="#fffff"
            >
              <CardBody
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"20px"}
              >
                <Box h={"100%"}>
                  <Image
                    className="img-weapon"
                    src={item.displayIcon}
                    alt="icon"
                  />
                </Box>
                <h1>{item.displayName}</h1>
              </CardBody>
              <CardFooter>
                <Link to={`/weapons/${item.uuid}`}>
                  <Button
                    border={"1px solid #FF4655"}
                    variant="outline"
                    color={"#FF4655"}
                  >
                    More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default AppWeapons;
