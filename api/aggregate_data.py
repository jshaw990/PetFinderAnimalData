import pandas as pd

def aggrgate_animal_data(data):
    df = pd.DataFrame(data)

    average_age = df["age"].value_counts()
    average_gender = df["gender"].value_counts()
    count_coat = df["coat"].value_counts()
    count_size = df["size"].value_counts()
    count_status = df["status"].value_counts()
    count_species = df["species"].value_counts()
    
    count_tags = df["tags"].apply(pd.Series).stack().value_counts()

    df['breed_primary'] = df['breeds'].apply(lambda x: x.get('primary'))
    count_breeds = df['breed_primary'].value_counts()

    df['declawed'] = df['attributes'].apply(lambda x: x.get('declawed'))
    count_declawed = df['declawed'].value_counts()

    df['house_trained'] = df['attributes'].apply(lambda x: x.get('house_trained'))
    count_house_trained = df['house_trained'].value_counts()

    df['shots_current'] = df['attributes'].apply(lambda x: x.get('shots_current'))
    count_shots_current = df['shots_current'].value_counts()

    df['spayed_neutered'] = df['attributes'].apply(lambda x: x.get('spayed_neutered'))
    count_spayed_neutered = df['spayed_neutered'].value_counts()

    df['special_needs'] = df['attributes'].apply(lambda x: x.get('special_needs'))
    count_special_needs = df['special_needs'].value_counts()

    df['dogs'] = df['environment'].apply(lambda x: x.get('dogs'))
    count_e_dogs = df['dogs'].value_counts()

    df['cats'] = df['environment'].apply(lambda x: x.get('cats'))
    count_e_cats = df['cats'].value_counts()

    df['children'] = df['environment'].apply(lambda x: x.get('children'))
    count_e_children = df['children'].value_counts()

    df['primary'] = df['colors'].apply(lambda x: x.get('primary'))
    count_c_primary = df['primary'].value_counts()

    df['address'] = df['contact'].apply(lambda x: x.get('address'))
    df['state'] = df['address'].apply(lambda x: x.get('state'))
    count_state = df['state'].value_counts()
    
    aggregate_object = {
        "age": average_age.to_dict(),
        "gender": average_gender.to_dict(),
        "coat": count_coat.to_dict(),
        "size": count_size.to_dict(),
        "status": count_status.to_dict(),
        "species": count_species.to_dict(),
        "breeds": count_breeds.to_dict(),
        "tags": count_tags.to_dict(),
        "declawed": count_declawed.to_dict(),
        "house_trained": count_house_trained.to_dict(),
        "shots_current": count_shots_current.to_dict(),
        "spayed_neutered": count_spayed_neutered.to_dict(),
        "special_needs": count_special_needs.to_dict(),
        "e_dogs": count_e_dogs.to_dict(),
        "e_cats": count_e_cats.to_dict(),
        "e_children": count_e_children.to_dict(),
        "c_primary": count_c_primary.to_dict(),
        "state": count_state.to_dict()
    }

    return aggregate_object
