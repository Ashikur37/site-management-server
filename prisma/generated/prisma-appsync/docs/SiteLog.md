# SiteLog

-   [Fields](#fields)
-   [Queries](#queries)
-   [Mutations](#mutations)
-   [Subscriptions](#subscriptions)

## Fields

List of fields available in the `SiteLog` type.

| Field     | Scalar Type       | Unique  | Required (create) |
| --------- | ----------------- | ------- | ----------------- |
| id        | Int               | true    | true              |
| createdAt | AWSDateTime       | _false_ | true              |
| user      | [User](./User.md) | _false_ | true              |
| userId    | Int               | true    | true              |
| site      | [Site](./Site.md) | _false_ | true              |
| siteId    | Int               | true    | true              |

## Queries

Queries are responsible for all `Read` operations.

The generated queries are:

-   `getSiteLog`: Read a single SiteLog.
-   `listSiteLogs`: Read multiple SiteLogs.
-   `countSiteLogs`: Count all SiteLogs.

### Querying a single SiteLog

Single SiteLog queries take one input:

-   `where`: `SiteLogWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).

**Standard query**

```graphql
query {
    getSiteLog(where: { id: 2 }) {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

### Querying multiple SiteLogs

Multiple SiteLogs queries can take four inputs:

-   `where`: `SiteLogWhereFilterInput` An optional object type to filter the content based on a nested set of criteria.
-   `orderBy`: `[SiteLogOrderByInput]` An optional array to select which field(s) and order to sort the records on. Sorting can be in ascending order `ASC` or descending order `DESC`.
-   `skip`: `Int` An optional number that specifies how many of the returned objects in the list should be skipped.
-   `take`: `Int` An optional number that specifies how many objects should be returned in the list.

**Standard query**

```graphql
query {
    listSiteLogs {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

**Standard query with offset pagination**

```graphql
query {
    listSiteLogs(skip: 0, take: 25) {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

**Standard query with basic where filter**

```graphql
query {
    listSiteLogs(
        where: { createdAt: { equals: "dd/mm/YYYY" } }
    ) {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

**Standard query with more advanced where filter**

```graphql
query {
    listSiteLogs(
        where: {
            createdAt: { not: { equals: "dd/mm/YYYY" } }
        }
    ) {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

**Standard query with orderBy**

```graphql
query {
    listSiteLogs(orderBy: [{ createdAt: DESC }]) {
        id
        createdAt
        user # Relation to one
        userId
        site # Relation to one
        siteId
    }
}
```

### Counting SiteLogs

Counting SiteLogs queries can take four inputs:

-   `where`: `SiteLogWhereFilterInput` An optional object type to filter the content based on a nested set of criteria.
-   `orderBy`: `[SiteLogOrderByInput]` An optional array to select which field(s) and order to sort the records on. Sorting can be in ascending order `ASC` or descending order `DESC`.
-   `skip`: `Int` An optional number that specifies how many of the returned objects in the list should be skipped.
-   `take`: `Int` An optional number that specifies how many objects should be returned in the list.

**Standard query**

```graphql
query {
    countSiteLogs
}
```

> `countSiteLogs` returns an integer that represents the number of records found.

## Mutations

Mutations are responsible for all `Create`, `Update`, and `Delete` operations.

The generated mutations are:

-   `createSiteLog`: Create a single SiteLog.
-   `updateSiteLog`: Update a single SiteLog.
-   `upsertSiteLog`: Update existing OR create single SiteLog.
-   `deleteSiteLog`: Delete a single SiteLog.
-   `createManySiteLogs`: Create multiple SiteLogs.
-   `updateManySiteLogs`: Update multiple SiteLogs.
-   `deleteManySiteLogs`: Delete multiple SiteLogs.

### Creating a single SiteLog

Single SiteLog create mutations take one input:

-   `data`: `SiteLogCreateInput!` A required object type specifying the data to create a new record.

**Standard create mutation**

```graphql
mutation {
    createSiteLog(data: { userId: 2, siteId: 2 }) {
        id
        createdAt
        userId
        siteId
    }
}
```

**Advanced create mutation using relation queries**

<details><summary>List of all nested queries available</summary>
<p>

```graphql
user: {
    create: SiteLogUserCreateInput, # Relation to one
    connect: SiteLogUserWhereUniqueInput, # Relation to one
    connectOrCreate: SiteLogUserConnectOrCreateInput # Relation to one
}
site: {
    create: SiteLogSiteCreateInput, # Relation to one
    connect: SiteLogSiteWhereUniqueInput, # Relation to one
    connectOrCreate: SiteLogSiteConnectOrCreateInput # Relation to one
}
```

</p>
</details>

```graphql
mutation {
    createSiteLog(
        data: {
            user: {
                connectOrCreate: {
                    where: SiteLogWhereUniqueInput
                    create: SiteLogCreateInput
                }
            }
        }
    ) {
        id
    }
}
```

### Updating a single SiteLog

Single SiteLog update mutations take two inputs:

-   `where`: `SiteLogWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).
-   `data`: `SiteLogUpdateInput!` A required object type specifying the data to update.

**Standard update mutation**

```graphql
mutation {
    updateSiteLog(
        where: { id: 2 }
        data: { userId: 2, siteId: 2 }
    ) {
        id
        createdAt
        userId
        siteId
    }
}
```

**Advanced update mutation using relation queries**

<details><summary>List of all nested queries available</summary>
<p>

```graphql
user: {
    create: SiteLogUserCreateInput, # Relation to one
    connect: SiteLogUserWhereUniqueInput, # Relation to one
    connectOrCreate: SiteLogUserConnectOrCreateInput, # Relation to one
    update: SiteLogUserUpdateInput, # Relation to one
    upsert: SiteLogUserUpsertInput, # Relation to one
    delete: true,
    disconnect: true,
}
site: {
    create: SiteLogSiteCreateInput, # Relation to one
    connect: SiteLogSiteWhereUniqueInput, # Relation to one
    connectOrCreate: SiteLogSiteConnectOrCreateInput, # Relation to one
    update: SiteLogSiteUpdateInput, # Relation to one
    upsert: SiteLogSiteUpsertInput, # Relation to one
    delete: true,
    disconnect: true,
}
```

</p>
</details>

```graphql
mutation {
    updateSiteLog(
        data: {
            user: {
                connectOrCreate: {
                    where: SiteLogWhereUniqueInput
                    create: SiteLogCreateInput
                }
            }
        }
    ) {
        id
    }
}
```

### Deleting a single SiteLog

Single SiteLog delete mutations take one input:

-   `where`: `SiteLogWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).

**Standard delete mutation**

```graphql
mutation {
    deleteSiteLog(where: { id: 2 }) {
        id
        createdAt
        userId
        siteId
    }
}
```

### Creating multiple SiteLogs

Multiple SiteLogs create mutations take one input:

-   `data`: `[SiteLogCreateManyInput!]` A required array specifying the data to create new records.
-   `skipDuplicates`: `Boolean` An optional Boolean specifying if unique fields or ID fields that already exist should be skipped.

**Standard deleteMany mutation**

```graphql
mutation {
    createManySiteLogs(
        data: [
            { createdAt: "dd/mm/YYYY" }
            { createdAt: "dd/mm/YYYY" }
            { createdAt: "dd/mm/YYYY" }
        ]
        skipDuplicates: true
    ) {
        count
    }
}
```

> `createManySiteLogs` returns an integer that represents the number of records that were created.

### Updating multiple SiteLogs

Multiple SiteLogs update mutations take two inputs:

-   `where`: `SiteLogWhereFilterInput!` A required object type to filter the content based on a nested set of criteria.
-   `data`: `SiteLogUpdateInput!` A required object type specifying the data to update records with.

**Standard updateMany mutation**

```graphql
mutation {
    updateManySiteLogs(
        where: { createdAt: "dd/mm/YYYY" }
        data: { createdAt: "dd/mm/YYYY" }
    ) {
        count
    }
}
```

> `updateManySiteLogs` returns an integer that represents the number of records that were updated.

### Deleting multiple SiteLogs

Multiple SiteLogs delete mutations can take one input:

-   `where`: `SiteLogWhereFilterInput!` A required object type to filter the content based on a nested set of criteria.

**Standard deleteMany mutation**

```graphql
mutation {
    deleteManySiteLogs(where: { createdAt: "dd/mm/YYYY" }) {
        count
    }
}
```

> `deleteManySiteLogs` returns an integer that represents the number of records that were deleted.

## Subscriptions

Subscriptions allows listen for data changes when a specific event happens, in real-time.

### Subscribing to a single SiteLog creation

Triggered from `createSiteLog` mutation (excl. `createManySiteLogs` and `upsertSiteLog`).

```graphql
subscription {
    onCreatedSiteLog {
        id
        createdAt
        userId
        siteId
    }
}
```

### Subscribing to a single SiteLog update

Triggered from `updateSiteLog` mutation (excl. `updateManySiteLogs` and `upsertSiteLog`).

```graphql
subscription {
    onUpdatedSiteLog {
        id
        createdAt
        userId
        siteId
    }
}
```

### Subscribing to a single SiteLog upsert

Triggered from `upsertSiteLog` mutation.

```graphql
subscription {
    onUpsertedSiteLog {
        id
        createdAt
        userId
        siteId
    }
}
```

### Subscribing to a single SiteLog deletion

Triggered from `deleteSiteLog` mutation (excl. `deleteManySiteLogs`).

```graphql
subscription {
    onDeletedSiteLog {
        id
        createdAt
        userId
        siteId
    }
}
```

### Subscribing to a single SiteLog mutation

Triggered from ANY SINGLE record mutation (excl. `on*ManySiteLogs`).

```graphql
subscription {
    onMutatedSiteLog {
        id
        createdAt
        userId
        siteId
    }
}
```

### Subscribing to many SiteLog creations

Triggered from `createManySiteLogs` mutation.

```graphql
subscription {
    onCreatedManySiteLogs {
        count
    }
}
```

### Subscribing to many SiteLog updates

Triggered from `updateManySiteLogs` mutation.

```graphql
subscription {
    onUpdatedManySiteLogs {
        count
    }
}
```

### Subscribing to many SiteLog deletions

Triggered from `deleteManySiteLogs` mutation.

```graphql
subscription {
    onDeletedManySiteLogs {
        count
    }
}
```

### Subscribing to many SiteLog mutations

Triggered from ANY MULTIPLE records mutation (excl. single record mutations).

```graphql
subscription {
    onMutatedManySiteLogs {
        count
    }
}
```
