/*
 * true description instead of `we rock it` (under title)
 */

import Layout from "../components/layout"
import SEO from "../components/seo"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  textColor,
  breakpoint,
  backgroundColor,
} from "../theming/theme-getters"
import AppFunctionComponent from "@appnroll/app-function-component"
import { graphql } from "gatsby"

import AddIcon from "../images/icons/add.svg"
import AddedIcon from "../images/icons/added.svg"
import ExternalLinkIcon from "../images/icons/external_link.svg"
import LinkIcon from "../images/icons/link.svg"
import LocationIcon from "../images/icons/location.svg"
import ColorLanguage from "../images/icons/color_language.svg"
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
  assignableUsers: {
    totalCount: number
  }
  languages: {
    edges: {
      node: ILanguage
    }[]
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

  span {
    margin-right: 24px;
    letter-spacing: 0.01em;
    white-space: nowrap;
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
      <Avatar href={props.websiteUrl} target="_blank" title={props.name}>
        <Logo />
      </Avatar>
      <Details>
        <h1>
          {props.name}
          {!props.repositoriesCount ? ` has no repositories yet` : `'s `}
          repositor{props.repositoriesCount < 2 ? `y` : `ies`}
        </h1>
        <p>{props.description}</p>
        <div>
          <span>
            <LocationIcon />
            {props.location}
          </span>
          <span>
            <LinkIcon />
            {props.websiteUrl}
          </span>
        </div>
      </Details>
    </header>
  )
)`
  display: flex;
  align-items: center;
`
const Search = styled.input``
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

  > * {
    margin: 9px;
    flex-basis: 100%;
    }
  }

  @media (min-width: ${breakpoint("tablet")}) {
    max-width: 600px;

    > * {
      flex-basis: auto;
    }
  }
`
const Cards = styled.section`
  display: flex;
  flex-wrap: wrap;
  margin-left: -7.5px;
  margin-right: -7.5px;
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

  svg {
    margin-right: 4px;
  }
`
const Card = styled.article`
  display: flex;
  flex: 1 calc(33% - 15px);
  flex-direction: column;
  border: 1px solid ${textColor("lightest")};
  border-top-width: 6px;
  border-radius: 5px;
  margin: 0 7.5px 24px;
  min-width: 330px;

  > * {
    padding-left: 30px;
    padding-right: 30px;
  }
`

const IndexPage: AppFunctionComponent<IProps> = ({
  data: {
    github: { organization },
  },
}) => {
  const languages: any = { ANY: { id: "ANY", name: "", color: "" } }
  const [filter, setFilter] = useState<IFilter>({
    query: "",
    language: languages.ANY,
  })

  // Generate languages
  organization.repositories.nodes.forEach(
    (r) =>
      (languages[r.languages.edges[0].node.id] = {
        ...r.languages.edges[0].node,
      })
  )

  useEffect(() => {
    console.log("FILTER:", filter)
  })

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

  const clearFilters = (e: React.MouseEvent): void => {
    if (e) e.preventDefault()
    setFilter({ query: "", language: languages.ANY })
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
          placeholder="Search"
          value={filter.query}
          onChange={handleSearchChange}
        />
        <Language value={filter.language.id} onChange={handleLanguageChange}>
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
                r.languages.edges.filter((e) => {
                  return e.node.id === filter.language.id
                }).length)
          )
          .map((r) => (
            <Card key={r.id}>
              <CardHeader>
                <CardTitle>{r.name}</CardTitle>
                <CardStar>
                  <AddIcon />
                </CardStar>
              </CardHeader>
              <CardLink>
                <ExternalLinkIcon />
                {r.url.split("github.com/")[1]}
              </CardLink>
              <CardDescription>{r.description}</CardDescription>
              <CardFooter>
                <div>
                  <ColorLanguage
                    style={{ color: r.languages.edges[0].node.color }}
                  />{" "}
                  {r.languages.edges[0].node.name}
                </div>
                <div>
                  <StarsIcon />
                  {r.stargazers.totalCount}
                </div>
                <div>
                  <VisitorsIcon />
                  {r.assignableUsers.totalCount}
                </div>
                <div>
                  <IssuesIcon />
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
            assignableUsers {
              totalCount
            }
            languages(last: 1) {
              edges {
                node {
                  id
                  name
                  color
                }
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
