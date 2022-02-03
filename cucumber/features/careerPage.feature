Feature: EPAM job searching
  As a Job searcher
  I want to browser through EPAM Job offers by various criteria
  So I can find to best fitting offer for me

Scenario Outline: 1/<#> Search for a job in <City> <Country>
    Given the EPAM Career Page is opened
    When the Cookie Policy is accepted
    Then the "Search form" should be visible

    When "<Country>" and "<City>" is selected in the "Location filter box"
    Then the "Location filter box" should contain "<City>"

    When "<Skill>" is selected in the "Skills filter box"    
    Then the "Skills filter box" should contain "Skills Counter"
    And the "Search form" should contain "<Skill>" tag

    When the "Search button" is clicked
    Then the "Search Result List" should be visible
    And the "<PositionName>" position should be visible
    And the "location of the position" should contain "<City>"
    And the "Apply button of the position" should be displayed

    When the "Apply button of the position" is clicked
    Then the "Vacancy description" should be displayed
    And the "Vacancy description" should contain "<City>"
    And the "Vacancy description" should have "<PositionName>"

Examples:
| # | Country | City     | Skill                     | PositionName              |
| 1 | Hungary | Debrecen | Software Test Engineering | Test Automation Engineer  |
| 2 | Belarus | Minsk    | Business and Data Analysis| Analyst                   |
