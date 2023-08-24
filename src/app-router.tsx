import { Route, Routes } from 'react-router-dom';

// import { Layout } from '@/components/layouts';
// import { PrivateRoute } from '@/compound/privateRoute';
import { privateRouteArr, publicRoutesArr } from '@/routes';

export const AppRouter = () => {
    return (
        <Routes>
            {/* <Route element={<PrivateRoute />}> */}
            <Route>
                {publicRoutesArr.map(({ Component, path }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {/* {privateRouteArr.map(({ Component, path }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))} */}
            </Route>
            {/* </Route> */}
            {/* {publicRoutesArr.map(({ Component, path }) => (
                <Route key={path} path={path} element={<Component />} />
            ))} */}
        </Routes>
    );
};
