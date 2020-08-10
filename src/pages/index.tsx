import Layout from "../components/layout"
import SEO from "../components/seo"
import React, { useState } from "react"
import styled from "styled-components"
import { textColor, breakpoint } from "../theming/theme-getters"
import AppFunctionComponent from "@appnroll/app-function-component"
import { graphql } from "gatsby"

import AddIcon from "../images/icons/add.svg"
import AddedIcon from "../images/icons/added.svg"
import ExternalLinkIcon from "../images/icons/external-link.svg"
import LinkIcon from "../images/icons/link.svg"
import LocationIcon from "../images/icons/location.svg"
import ColorLanguage from "../images/icons/color-language.svg"
import StarsIcon from "../images/icons/stars.svg"
import VisitorsIcon from "../images/icons/visitors.svg"
import IssuesIcon from "../images/icons/issues.svg"
import Logo from "../images/logo/appnroll.svg"

interface IRepository {
  id: string
  name: string
  issues: {
    totalCount: number
  }
  languages: {
    nodes: ILanguage[]
  }
  stargazers: {
    totalCount: number
  }
  description: string
  url: string
}
interface IProps {
  readonly data: {
    github: {
      organization: {
        repositories: {
          nodes: IRepository[]
        }
        name: string
        description: string
        location: string
        websiteUrl: string
      }
    }
  }
}

interface IFilter {
  query: string
  language: ILanguage
}

interface ILanguage {
  id: string
  name: string
  color: string
}

const Avatar = styled.a`
  width: 102px;
  height: 102px;
  background: #0f1436;
  border: 1px solid #e3e5e8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 60%;
    height: auto;
  }
`
const Details = styled.div`
  padding: 0 20px;

  > * {
    margin: 0.571rem 0;
  }

  p {
    color: ${textColor("light")};
  }

  svg {
    vertical-align: top;
    margin: 0 0.1em;
  }

  a {
    color: ${textColor("primary")};
  }

  span {
    margin-right: 24px;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
`

const Search = styled.input``
const SearchIcon = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  overflow: hidden;
  position: relative;
  left: -40px;
  margin-right: -16px;
  z-index: 1;

  :before {
    content: "";
    display: block;
    width: ${8 * Math.SQRT2}px;
    height: 1px;
    background: ${textColor("light")};
    transform: translate(8px, 14px) rotate(45deg);
  }

  :after {
    content: "";
    display: block;
    position: relative;
    z-index: 2;
    width: 12px;
    height: 12px;
    background: #fff;
    border: 1px solid ${textColor("light")};
    border-radius: 200%;
  }
`
const Language = styled.select`
  flex-grow: 1;
  margin: 0 1.125rem;
`
const Filters = styled.form`
  margin: 31px -9px;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  input, select, button {
    margin: 9px;
    flex-basis: 100%;
    }
  }

  @media (min-width: ${breakpoint("sm")}) {
    max-width: 600px;

    input, select, button {
      flex-basis: auto;
    }
  }
`
const CardHeader = styled.header`
  position: relative;
`
const CardTitle = styled.h2`
  font-size: 1.714rem;
  color: #243c56;
  padding-right: 40px;
  margin: 2rem 0 1.143rem;
`
const CardStar = styled.button`
  width: 32px;
  height: 32px;
  line-height: 1;
  text-align: center;
  display: block;
  padding: 0;
  position: absolute;
  top: 32px;
  right: 32px;
  outline: none;
  transform: scale(1);
  transition: transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &.clicked {
    transform: scale(0.8);
  }
`
const CardLink = styled.a`
  color: ${textColor("accent")};

  svg {
    margin-right: 10px;
  }
`
const CardDescription = styled.p`
  font-size: 1.14rem;
  color: #7d8ca1; /* we have 3 gray'ish colors defined already 🤔 */
  letter-spacing: 0;
  line-height: 1.5;
`
const CardFooter = styled.footer`
  background: rgba(39, 124, 220, 0.04);
  padding-top: 35px;
  padding-bottom: 35px;
  margin-top: auto;
  font-size: 0.857rem;
  letter-spacing: 0.02em;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 4px;
  }
`
const Cards = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex: 0 1 auto;
  margin: 0 -7.5px;
`
const Card = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid ${textColor("lightest")};
  border-top-width: 6px;
  border-radius: 5px;
  margin: 0 7.5px 24px;
  flex-basis: 100%;

  > * {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media (min-width: ${breakpoint("md")}) {
    flex-basis: calc(50% - 15px);
  }

  @media (min-width: ${breakpoint("lg")}) {
    flex-basis: calc(33.33% - 15px);
  }
`

const ProfileInfo = styled(
  (props: {
    name: string
    className?: string
    description: string
    location: string
    websiteUrl: string
    repositoriesCount: number
  }) => (
    <header className={props.className}>
      <Avatar
        title={"Visit " + props.name + " website"}
        href={props.websiteUrl}
        target="_blank"
        rel="nofollow"
      >
        <Logo title={props.name} />
      </Avatar>
      <Details>
        <h1>
          {props.name}
          {!props.repositoriesCount ? ` has no repositories yet` : `'s `}
          repositor{props.repositoriesCount < 2 ? `y` : `ies`}
        </h1>
        <p>{props.description}</p>
        <div>
          <span title="Location">
            <LocationIcon />
            {props.location}
          </span>
          <span>
            <LinkIcon />
            <a
              title={"Visit " + props.name + " website"}
              href={props.websiteUrl}
              target="_blank"
              rel="nofollow"
            >
              {props.websiteUrl}
            </a>
          </span>
        </div>
      </Details>
    </header>
  )
)`
  display: flex;
  align-items: center;
`

const IndexPage: AppFunctionComponent<IProps> = ({
  data: {
    github: { organization },
  },
}) => {
  const LSKEY = "starred"
  const languages: any = { ANY: { id: "ANY", name: "", color: "" } }
  const [filter, setFilter] = useState<IFilter>({
    query: "",
    language: languages.ANY,
  })
  const [starred, setStarred] = useState<string>(
    (typeof window !== "undefined" && window.localStorage.getItem(LSKEY)) || ""
  )

  // Generate languages
  organization.repositories.nodes.forEach(
    (r) =>
      (languages[r.languages.nodes[0].id] = {
        ...r.languages.nodes[0],
      })
  )

  // useEffect(() => {
  //   console.log("FILTER:", filter)
  // })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    setFilter({ query: e.target.value, language: filter.language })
  }

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilter({
      query: filter.query,
      language: languages[e.target.value],
    })
  }

  const handleStarClick = (
    id: string,
    e: React.MouseEvent<HTMLElement>
  ): void => {
    e.preventDefault()

    const starredArr = starred.split(" ").filter((ele) => ele)
    const idx = starredArr.indexOf(id)
    const { classList } = e.currentTarget

    idx > -1 ? starredArr.splice(idx, 1) : starredArr.push(id)

    const starredStr = starredArr.join(" ").trim()

    setStarred(starredStr)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LSKEY, starredStr)

      // Decorate
      classList.toggle("clicked")
      window.setTimeout(() => {
        classList.toggle("clicked")
      }, 200)
    }
  }

  const clearFilters = (e: React.MouseEvent): void => {
    if (e) e.preventDefault()
    setFilter({ query: "", language: languages.ANY })
  }

  const handleSearchIconClick = (e: React.MouseEvent<HTMLElement>): void => {
    const input = document.querySelector<HTMLElement>(
      "." + Search.styledComponentId
    )

    if (input) input.focus()
  }

  return (
    <Layout>
      <SEO title="Home" />
      <ProfileInfo
        name={organization.name}
        description={organization.description}
        location={organization.location}
        websiteUrl={organization.websiteUrl}
        repositoriesCount={organization.repositories.nodes.length}
      />
      <Filters title="Filters">
        <Search
          title="Search pharse"
          placeholder="Search"
          value={filter.query}
          onChange={handleSearchChange}
        />
        <SearchIcon onClick={handleSearchIconClick} />
        <Language
          title="Language"
          value={filter.language.id}
          onChange={handleLanguageChange}
        >
          {Object.keys(languages).map((k, index) => (
            <option
              aria-selected={filter.language.id === k}
              key={index}
              value={languages[k].id}
            >
              {languages[k] !== languages.ANY
                ? languages[k].name
                : "Select language"}
            </option>
          ))}
        </Language>
        <button title="Clear filters" onClick={clearFilters}>
          Clear filters
        </button>
      </Filters>
      <Cards>
        {organization.repositories.nodes
          .filter(
            (r) =>
              // search query match
              (filter.query === "" ||
                [r.id, r.description, r.name, r.url]
                  .join(" ")
                  .includes(filter.query)) &&
              // language match
              (filter.language.id === languages.ANY.id ||
                r.languages.nodes.filter((n) => {
                  return n.id === filter.language.id
                }).length)
          )
          .map((r) => (
            <Card
              key={r.id}
              style={{ borderTopColor: r.languages.nodes[0].color }}
            >
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
                <CardStar
                  title={starred.includes(r.id) ? "Star" : "Unstar"}
                  onClick={handleStarClick.bind(null, r.id)}
                >
                  {starred.includes(r.id) ? <AddedIcon /> : <AddIcon />}
                </CardStar>
              </CardHeader>
              <CardLink
                title="Visit repository"
                href={r.url}
                target="_blank"
                rel="nofollow"
              >
                <ExternalLinkIcon />
                {r.url.split("github.com/")[1]}
              </CardLink>
              <CardDescription>{r.description}</CardDescription>
              <CardFooter>
                <div>
                  <ColorLanguage
                    title="Language color"
                    style={{ color: r.languages.nodes[0].color }}
                  />{" "}
                  {r.languages.nodes[0].name}
                </div>
                <div>
                  <StarsIcon
                    title={`Starred $(r.stargazers.totalCount) times`}
                  />
                  {r.stargazers.totalCount}
                </div>
                <div>
                  <VisitorsIcon />?
                </div>
                <div>
                  <IssuesIcon
                    title={`${r.issues.totalCount} issue${
                      r.issues.totalCount === 1 ? "" : "s"
                    }`}
                  />
                  {r.issues.totalCount}
                </div>
              </CardFooter>
            </Card>
          ))}
      </Cards>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    github {
      organization(login: "appnroll") {
        repositories(last: 6) {
          nodes {
            id
            name
            issues {
              totalCount
            }
            languages(first: 1) {
              nodes {
                id
                name
                color
              }
            }
            stargazers {
              totalCount
            }
            description
            url
          }
        }
        name
        description
        location
        websiteUrl
      }
    }
  }
`
