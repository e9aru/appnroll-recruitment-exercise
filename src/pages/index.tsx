import Layout from "../components/layout"
import SEO from "../components/seo"
import React from "react"
import AppFunctionComponent from "@appnroll/app-function-component"
import GithubProfile from "../components/github-profile"

const IndexPage: AppFunctionComponent = () => (
  <Layout>
    <SEO title="Home" />
    <GithubProfile />
  </Layout>
)

export default IndexPage
