import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  loading?: boolean;
}

function ProCardLoader(props: Props) {
  const { loading = true } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        avatar={
          loading && (
            <Skeleton
              animation="wave"
              variant="circular"
              width={60}
              height={60}
            />
          )
        }
        action={null}
        title={
          loading && (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          )
        }
        subheader={
          loading && <Skeleton animation="wave" height={10} width="40%" />
        }
      />
      {loading && (
        <Skeleton sx={{ height: 48 }} animation="wave" variant="rectangular" />
      )}
      <CardContent>
        {loading && (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProfessionalCardLoader() {
  return (
    <div>
      <ProCardLoader loading />
    </div>
  );
}
