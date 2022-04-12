import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMockRouter } from "../../../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import NavBar from "../../../src/components/NavBar";
import routes from "../../../src/utils/routes";

describe("NavBar", () => {
    let router: ReturnType<typeof createMockRouter>;
    beforeEach(() => {
        router = createMockRouter({ asPath: routes.HomePage.path });
    });

    it("should have all the links", () => {
        render(
            <RouterContext.Provider value={router}>
                <NavBar />
            </RouterContext.Provider>
        );
        for (const [page, pageInfo] of Object.entries(routes)) {
            expect(screen.getByText(pageInfo.title)).toBeInTheDocument();
        }
    });

    it("should redirect correclty to all pages", async () => {
        render(
            <RouterContext.Provider value={router}>
                <NavBar />
            </RouterContext.Provider>
        );
        for (const [page, pageInfo] of Object.entries(routes)) {
            await waitFor(() => {
                fireEvent.click(screen.getByText(pageInfo.title));
                expect(router.push).toHaveBeenCalledWith(
                    pageInfo.path,
                    expect.anything(),
                    expect.anything()
                );
            });
        }
    });
});
