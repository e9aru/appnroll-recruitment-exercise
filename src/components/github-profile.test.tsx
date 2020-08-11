import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { render, cleanup, fireEvent } from "../tests/test-render"
import { useStaticQuery } from "gatsby"
import GithubProfile from "./github-profile"

afterEach(cleanup)

const mocked = {
  github: {
    organization: {
      repositories: {
        nodes: [
          {
            id: "MDEwOlJlcG9zaXRvcnkyMDMyMDA4NTc=",
            name: "appnroll-recruitment-exercise",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2U0MTc=",
                  name: "HTML",
                  color: "#e34c26",
                },
              ],
            },
            stargazers: {
              totalCount: 1,
            },
            description: "App'n'roll Recruitment Exercise",
            url: "https://github.com/Appnroll/appnroll-recruitment-exercise",
          },
          {
            id: "MDEwOlJlcG9zaXRvcnkyMTM2Njc0NTM=",
            name: "appnroll-developers",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2UxNDA=",
                  name: "JavaScript",
                  color: "#f1e05a",
                },
              ],
            },
            stargazers: {
              totalCount: 0,
            },
            description:
              "This is a space for App'n'roll's developers to store some knowledge about our processeses, work and similar topics.",
            url: "https://github.com/Appnroll/appnroll-developers",
          },
          {
            id: "MDEwOlJlcG9zaXRvcnkyNDUxMTM4ODE=",
            name: "OpenTripPlanner",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2U0MDM=",
                  name: "Makefile",
                  color: "#427819",
                },
              ],
            },
            stargazers: {
              totalCount: 2,
            },
            description: "An open source multi-modal trip planner",
            url: "https://github.com/Appnroll/OpenTripPlanner",
          },
          {
            id: "MDEwOlJlcG9zaXRvcnkyNjY3ODQ5Nzk=",
            name: "appnroll-app-function-component",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2UyODc=",
                  name: "TypeScript",
                  color: "#2b7489",
                },
              ],
            },
            stargazers: {
              totalCount: 0,
            },
            description: "AppFunctionComponent",
            url: "https://github.com/Appnroll/appnroll-app-function-component",
          },
          {
            id: "MDEwOlJlcG9zaXRvcnkyNzI3MjM0NDA=",
            name: "appnroll-delay-response-function",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2UyODc=",
                  name: "TypeScript",
                  color: "#2b7489",
                },
              ],
            },
            stargazers: {
              totalCount: 0,
            },
            description:
              "Function for controlled delaying of asynchronous response",
            url: "https://github.com/Appnroll/appnroll-delay-response-function",
          },
          {
            id: "MDEwOlJlcG9zaXRvcnkyNzc1MDIxMTA=",
            name: "appnroll-eslint-config",
            issues: {
              totalCount: 0,
            },
            languages: {
              nodes: [
                {
                  id: "MDg6TGFuZ3VhZ2UxNDA=",
                  name: "JavaScript",
                  color: "#f1e05a",
                },
              ],
            },
            stargazers: {
              totalCount: 1,
            },
            description: null,
            url: "https://github.com/Appnroll/appnroll-eslint-config",
          },
        ],
      },
      name: "App'n'roll",
      description:
        "A venture building company. Having fun building scalable businesses.",
      location: "Warsaw, Poland",
      websiteUrl: "https://appnroll.com",
    },
  },
}
;(useStaticQuery as jest.Mock).mockImplementation(() => mocked)

describe("render", () => {
  test("render", () => {
    expect(render(<GithubProfile />)).toMatchSnapshot()
  })
})

describe("filter", () => {
  test("by query and clear", () => {
    const { getByRole, getAllByRole, getByText } = render(<GithubProfile />)
    expect(getAllByRole("listitem")).toHaveLength(6)

    fireEvent.change(getByRole("textbox"), {
      target: { value: "Open" },
    })
    expect(getAllByRole("listitem")).toHaveLength(1)

    fireEvent.click(getByText(/clear/i))
    expect(getAllByRole("listitem")).toHaveLength(6)
  })

  test("by language", () => {
    const { getAllByRole, container } = render(<GithubProfile />)
    const languageId = "MDg6TGFuZ3VhZ2UyODc=" // Typescript
    const languageElement = container.querySelector(
      "[name=language]"
    ) as HTMLSelectElement

    expect(languageElement).toBeInTheDocument()

    fireEvent.change(languageElement, { target: { value: languageId } })
    expect(getAllByRole("listitem")).toHaveLength(2)
  })
})

describe("Card features", () => {
  test("LocalStorage - starring", () => {
    const { getAllByRole } = render(<GithubProfile />)
    const unstarredCards = getAllByRole("button", { pressed: false })

    expect(unstarredCards).toHaveLength(6)
    fireEvent.click(unstarredCards[0])

    cleanup()

    expect(
      render(<GithubProfile />).getAllByRole("button", { pressed: false })
    ).toHaveLength(5)
  })
})
