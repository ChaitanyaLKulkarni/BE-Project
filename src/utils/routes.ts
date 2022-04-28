const routes: {
    [key: string]: { path: string; title: string; hidden?: boolean };
} = {
    HomePage: { path: "/", title: "Home" },
    AvatarPage: { path: "/avatar", title: "Try it!" },
    AboutPage: { path: "/about", title: "About us", hidden: true },
    HamNoSysEditorPage: { path: "/hamnosys", title: "HamNosys Editor" },
    LessonsPage: { path: "/lessons", title: "Lessons" },
};
export default routes;
