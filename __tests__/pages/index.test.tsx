import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMockRouter } from "../../test-utils/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";
import Home from "../../pages/index";
import routes from "../../src/utils/routes";

describe("Home", () => {
    let router: ReturnType<typeof createMockRouter>;
    beforeEach(() => {
        router = createMockRouter({ asPath: routes.HomePage.path });
    });

    it("should renders a heading", async () => {
        render(
            <RouterContext.Provider value={router}>
                <Home />
            </RouterContext.Provider>
        );
        expect(screen.getByTestId("heading")).toBeInTheDocument();
    });

    it("should redirect to Avatarpage", async () => {
        render(
            <RouterContext.Provider value={router}>
                <Home />
            </RouterContext.Provider>
        );
        await waitFor(() => {
            fireEvent.click(screen.getByTestId("link"));

            expect(router.push).toHaveBeenCalledWith(
                "/avatar",
                expect.anything(),
                expect.anything()
            );
        });
    });
});
