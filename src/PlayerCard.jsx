import Avatar from "@mui/material/Avatar";
import { Stack, Box } from "@mui/system";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  let firstName = name;
  if (name.search(" ") > 0) {
    let temp = name.split(" ");
    firstName = temp[temp.length - 1];
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: firstName.charAt(0).toUpperCase(),
  };
}

function scoreToColor(score) {
  if (score < 0) return "red";
  if (score === 0) return "gray";
  if (score > 0) return "green";
}

export default function PlayerCard(props) {
  return (
    <>
      <Box
        sx={{
          border: "2px solid",
          borderColor: scoreToColor(props.score),
          borderRadius: "5px",
          width: "400px",
          padding: "5px",
          margin: "5px"
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Avatar {...stringAvatar(props.name)} />
          <Box sx={{ width: "200px" }}>{props.name}</Box>
          <Box>{props.score}</Box>
        </Stack>
      </Box>
    </>
  );
}
