import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  CircularProgress, // Import CircularProgress
} from "@mui/material";
import axios from "axios";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get("http://localhost:3001/get");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/add/${id}`);
  };

  return (
    <div className="Mar">
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress /> {/* Show loading spinner */}
        </div>
      ) : data.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No data available
        </Typography>
      ) : (
        <Grid container spacing={6}>
          {data.map((val, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <img
                    src={val.img_url}
                    className="img-fluid rounded-start"
                    width="100%"
                    alt={val.EmpName}
                  />
                  <Typography gutterBottom variant="h5">
                    {val.EmpName}
                  </Typography>
                  <Typography component="div">{val.designation}</Typography>
                  <Typography component="div">{val.empId}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(val._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate(val._id)}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Home;
