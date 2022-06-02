# Site

-   [Fields](#fields)
-   [Queries](#queries)
-   [Mutations](#mutations)
-   [Subscriptions](#subscriptions)

## Fields

List of fields available in the `Site` type.

| Field     | Scalar Type                | Unique  | Required (create) |
| --------- | -------------------------- | ------- | ----------------- |
| id        | Int                        | true    | true              |
| createdAt | AWSDateTime                | _false_ | true              |
| updatedAt | AWSDateTime                | _false_ | true              |
| name      | String                     | _false_ | true              |
| city      | String                     | _false_ | _false_           |
| latitude  | String                     | _false_ | _false_           |
| longitude | String                     | _false_ | _false_           |
| user      | [User](./User.md)          | _false_ | true              |
| userId    | Int                        | true    | true              |
| siteLogs  | [[SiteLog!]](./SiteLog.md) | _false_ | _false_           |

## Queries

Queries are responsible for all `Read` operations.

The generated queries are:

-   `getSite`: Read a single Site.
-   `listSites`: Read multiple Sites.
-   `countSites`: Count all Sites.

### Querying a single Site

Single Site queries take one input:

-   `where`: `SiteWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).

**Standard query**

```graphql
query {
    getSite(where: { id: 2 }) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

### Querying multiple Sites

Multiple Sites queries can take four inputs:

-   `where`: `SiteWhereFilterInput` An optional object type to filter the content based on a nested set of criteria.
-   `orderBy`: `[SiteOrderByInput]` An optional array to select which field(s) and order to sort the records on. Sorting can be in ascending order `ASC` or descending order `DESC`.
-   `skip`: `Int` An optional number that specifies how many of the returned objects in the list should be skipped.
-   `take`: `Int` An optional number that specifies how many objects should be returned in the list.

**Standard query**

```graphql
query {
    listSites {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

**Standard query with offset pagination**

```graphql
query {
    listSites(skip: 0, take: 25) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

**Standard query with basic where filter**

```graphql
query {
    listSites(
        where: { createdAt: { equals: "dd/mm/YYYY" } }
    ) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

**Standard query with more advanced where filter**

```graphql
query {
    listSites(
        where: {
            createdAt: { not: { equals: "dd/mm/YYYY" } }
        }
    ) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

**Standard query with orderBy**

```graphql
query {
    listSites(
        orderBy: [{ createdAt: DESC }, { updatedAt: ASC }]
    ) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        user # Relation to one
        userId

        siteLogs # Relation to many
    }
}
```

### Counting Sites

Counting Sites queries can take four inputs:

-   `where`: `SiteWhereFilterInput` An optional object type to filter the content based on a nested set of criteria.
-   `orderBy`: `[SiteOrderByInput]` An optional array to select which field(s) and order to sort the records on. Sorting can be in ascending order `ASC` or descending order `DESC`.
-   `skip`: `Int` An optional number that specifies how many of the returned objects in the list should be skipped.
-   `take`: `Int` An optional number that specifies how many objects should be returned in the list.

**Standard query**

```graphql
query {
    countSites
}
```

> `countSites` returns an integer that represents the number of records found.

## Mutations

Mutations are responsible for all `Create`, `Update`, and `Delete` operations.

The generated mutations are:

-   `createSite`: Create a single Site.
-   `updateSite`: Update a single Site.
-   `upsertSite`: Update existing OR create single Site.
-   `deleteSite`: Delete a single Site.
-   `createManySites`: Create multiple Sites.
-   `updateManySites`: Update multiple Sites.
-   `deleteManySites`: Delete multiple Sites.

### Creating a single Site

Single Site create mutations take one input:

-   `data`: `SiteCreateInput!` A required object type specifying the data to create a new record.

**Standard create mutation**

```graphql
mutation {
    createSite(
        data: {
            name: "Foo"
            city: "Foo"
            latitude: "Foo"
            longitude: "Foo"
            userId: 2
        }
    ) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

**Advanced create mutation using relation queries**

<details><summary>List of all nested queries available</summary>
<p>

```graphql
user: {
    create: SiteUserCreateInput, # Relation to one
    connect: SiteUserWhereUniqueInput, # Relation to one
    connectOrCreate: SiteUserConnectOrCreateInput # Relation to one
}
siteLogs: {
    create: [SiteSiteLogsCreateInput], # Relation to many
    connect: [SiteSiteLogsWhereUniqueInput], # Relation to many
    connectOrCreate: [SiteSiteLogsConnectOrCreateInput] # Relation to many
}
```

</p>
</details>

```graphql
mutation {
    createSite(
        data: {
            user: {
                connectOrCreate: {
                    where: SiteWhereUniqueInput
                    create: SiteCreateInput
                }
            }
            siteLogs: {
                connectOrCreate: [
                    {
                        where: SiteWhereUniqueInput
                        create: SiteCreateInput
                    }
                ]
            }
        }
    ) {
        id
    }
}
```

### Updating a single Site

Single Site update mutations take two inputs:

-   `where`: `SiteWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).
-   `data`: `SiteUpdateInput!` A required object type specifying the data to update.

**Standard update mutation**

```graphql
mutation {
    updateSite(
        where: { id: 2 }
        data: {
            name: "Foo"
            city: "Foo"
            latitude: "Foo"
            longitude: "Foo"
            userId: 2
        }
    ) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

**Advanced update mutation using relation queries**

<details><summary>List of all nested queries available</summary>
<p>

```graphql
user: {
    create: SiteUserCreateInput, # Relation to one
    connect: SiteUserWhereUniqueInput, # Relation to one
    connectOrCreate: SiteUserConnectOrCreateInput, # Relation to one
    update: SiteUserUpdateInput, # Relation to one
    upsert: SiteUserUpsertInput, # Relation to one
    delete: true,
    disconnect: true,
}
siteLogs: {
    create: [SiteSiteLogsCreateInput], # Relation to many
    connect: [SiteSiteLogsWhereUniqueInput], # Relation to many
    connectOrCreate: [SiteSiteLogsConnectOrCreateInput], # Relation to many
    update: [SiteSiteLogsUpdateUniqueInput], # Relation to many
    upsert: [SiteSiteLogsUpsertUniqueInput], # Relation to many
    delete: [SiteSiteLogsDeleteUniqueInput], # Relation to many
    disconnect: [SiteSiteLogsWhereUniqueInput], # Relation to many
    set: [SiteSiteLogsWhereUniqueInput], # Relation to many
    updateMany: [SiteSiteLogsUpdateManyInput], # Relation to many
    deleteMany: [SiteSiteLogsDeleteManyInput], # Relation to many
}
```

</p>
</details>

```graphql
mutation {
    updateSite(
        data: {
            user: {
                connectOrCreate: {
                    where: SiteWhereUniqueInput
                    create: SiteCreateInput
                }
            }
            siteLogs: {
                connectOrCreate: [
                    {
                        where: SiteWhereUniqueInput
                        create: SiteCreateInput
                    }
                ]
            }
        }
    ) {
        id
    }
}
```

### Deleting a single Site

Single Site delete mutations take one input:

-   `where`: `SiteWhereUniqueInput!` A required object type specifying a field with a unique constraint (like id).

**Standard delete mutation**

```graphql
mutation {
    deleteSite(where: { id: 2 }) {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Creating multiple Sites

Multiple Sites create mutations take one input:

-   `data`: `[SiteCreateManyInput!]` A required array specifying the data to create new records.
-   `skipDuplicates`: `Boolean` An optional Boolean specifying if unique fields or ID fields that already exist should be skipped.

**Standard deleteMany mutation**

```graphql
mutation {
    createManySites(
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

> `createManySites` returns an integer that represents the number of records that were created.

### Updating multiple Sites

Multiple Sites update mutations take two inputs:

-   `where`: `SiteWhereFilterInput!` A required object type to filter the content based on a nested set of criteria.
-   `data`: `SiteUpdateInput!` A required object type specifying the data to update records with.

**Standard updateMany mutation**

```graphql
mutation {
    updateManySites(
        where: { createdAt: "dd/mm/YYYY" }
        data: { createdAt: "dd/mm/YYYY" }
    ) {
        count
    }
}
```

> `updateManySites` returns an integer that represents the number of records that were updated.

### Deleting multiple Sites

Multiple Sites delete mutations can take one input:

-   `where`: `SiteWhereFilterInput!` A required object type to filter the content based on a nested set of criteria.

**Standard deleteMany mutation**

```graphql
mutation {
    deleteManySites(where: { createdAt: "dd/mm/YYYY" }) {
        count
    }
}
```

> `deleteManySites` returns an integer that represents the number of records that were deleted.

## Subscriptions

Subscriptions allows listen for data changes when a specific event happens, in real-time.

### Subscribing to a single Site creation

Triggered from `createSite` mutation (excl. `createManySites` and `upsertSite`).

```graphql
subscription {
    onCreatedSite {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Subscribing to a single Site update

Triggered from `updateSite` mutation (excl. `updateManySites` and `upsertSite`).

```graphql
subscription {
    onUpdatedSite {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Subscribing to a single Site upsert

Triggered from `upsertSite` mutation.

```graphql
subscription {
    onUpsertedSite {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Subscribing to a single Site deletion

Triggered from `deleteSite` mutation (excl. `deleteManySites`).

```graphql
subscription {
    onDeletedSite {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Subscribing to a single Site mutation

Triggered from ANY SINGLE record mutation (excl. `on*ManySites`).

```graphql
subscription {
    onMutatedSite {
        id
        createdAt
        updatedAt
        name
        city
        latitude
        longitude
        userId
    }
}
```

### Subscribing to many Site creations

Triggered from `createManySites` mutation.

```graphql
subscription {
    onCreatedManySites {
        count
    }
}
```

### Subscribing to many Site updates

Triggered from `updateManySites` mutation.

```graphql
subscription {
    onUpdatedManySites {
        count
    }
}
```

### Subscribing to many Site deletions

Triggered from `deleteManySites` mutation.

```graphql
subscription {
    onDeletedManySites {
        count
    }
}
```

### Subscribing to many Site mutations

Triggered from ANY MULTIPLE records mutation (excl. single record mutations).

```graphql
subscription {
    onMutatedManySites {
        count
    }
}
```
